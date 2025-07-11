/*
  # Création du profil administrateur pour Nicolas Curnier

  Cette migration sera exécutée après que l'utilisateur se soit inscrit
  via l'interface d'authentification Supabase.
*/

-- Fonction pour créer automatiquement un profil utilisateur après inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Si l'email correspond à l'admin, créer un profil admin
  IF NEW.email = 'nicolascurnier@gmail.com' THEN
    INSERT INTO public.user_profiles (id, nom, email, role)
    VALUES (NEW.id, 'Nicolas Curnier', NEW.email, 'admin');
  ELSE
    -- Pour les autres utilisateurs, créer un profil client par défaut
    INSERT INTO public.user_profiles (id, nom, email, role)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nom', 'Utilisateur'), NEW.email, 'client');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement le profil utilisateur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Mise à jour des politiques pour permettre l'insertion automatique
CREATE POLICY "Allow automatic profile creation"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);