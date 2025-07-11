/*
  # Création de l'utilisateur administrateur

  1. Mise à jour des politiques RLS
  2. Fonction pour créer l'utilisateur admin
  3. Correction des triggers
*/

-- Mise à jour de la politique pour permettre l'insertion automatique de profils
DROP POLICY IF EXISTS "Allow automatic profile creation" ON user_profiles;
CREATE POLICY "Allow automatic profile creation"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Fonction améliorée pour gérer les nouveaux utilisateurs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Créer le profil utilisateur selon l'email
  IF NEW.email = 'nicolascurnier@gmail.com' THEN
    INSERT INTO public.user_profiles (id, nom, email, role)
    VALUES (NEW.id, 'Nicolas Curnier', NEW.email, 'admin');
  ELSIF NEW.email = 'sophie@innovation-space.com' THEN
    INSERT INTO public.user_profiles (id, nom, email, role, entreprise)
    VALUES (NEW.id, 'Sophie Lemoine', NEW.email, 'client', 'Espace de Coworking Innovation');
  ELSIF NEW.email = 'gestionnaire@artlease.com' THEN
    INSERT INTO public.user_profiles (id, nom, email, role)
    VALUES (NEW.id, 'Gestionnaire Catalogue', NEW.email, 'gestionnaire');
  ELSE
    -- Pour les autres utilisateurs, créer un profil client par défaut
    INSERT INTO public.user_profiles (id, nom, email, role)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nom', 'Utilisateur'), NEW.email, 'client');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour ajouter un abonné newsletter avec gestion des doublons
CREATE OR REPLACE FUNCTION add_newsletter_subscriber(
  p_email text,
  p_nom text DEFAULT NULL,
  p_entreprise text DEFAULT NULL,
  p_source text DEFAULT 'Site web'
)
RETURNS uuid AS $$
DECLARE
  subscriber_id uuid;
BEGIN
  -- Insérer ou mettre à jour l'abonné
  INSERT INTO newsletter_subscribers (email, nom, entreprise, source, statut)
  VALUES (p_email, p_nom, p_entreprise, p_source, 'Actif')
  ON CONFLICT (email) 
  DO UPDATE SET 
    statut = 'Actif',
    date_desinscription = NULL,
    updated_at = now()
  RETURNING id INTO subscriber_id;
  
  RETURN subscriber_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permettre l'exécution de la fonction par les utilisateurs authentifiés
GRANT EXECUTE ON FUNCTION add_newsletter_subscriber TO authenticated;
GRANT EXECUTE ON FUNCTION add_newsletter_subscriber TO anon;

-- Mise à jour des politiques pour les prospects (permettre l'insertion depuis le formulaire de contact)
CREATE POLICY "Allow prospect creation from contact form"
  ON prospects FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Données d'exemple supplémentaires
INSERT INTO newsletter_subscribers (email, nom, entreprise, source) VALUES
('test@example.com', 'Utilisateur Test', 'Entreprise Test', 'Site web')
ON CONFLICT (email) DO NOTHING;