/*
  # Création de l'utilisateur administrateur

  1. Création du profil administrateur
    - Email: nicolascurnier@gmail.com
    - Rôle: admin
    - Nom: Nicolas Curnier

  2. Table newsletter
    - Gestion des abonnés à la newsletter
    - Historique des envois

  3. Mise à jour des politiques de sécurité
*/

-- Créer le profil administrateur (l'utilisateur doit d'abord s'inscrire via l'interface)
-- Cette insertion sera faite après la création du compte auth

-- Table pour la gestion de la newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  nom text,
  entreprise text,
  statut text NOT NULL DEFAULT 'Actif' CHECK (statut IN ('Actif', 'Inactif', 'Désabonné')),
  source text NOT NULL DEFAULT 'Site web' CHECK (source IN ('Site web', 'Contact', 'Manuel', 'Import')),
  date_inscription timestamptz DEFAULT now(),
  date_desinscription timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table pour l'historique des newsletters envoyées
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  titre text NOT NULL,
  contenu text NOT NULL,
  sujet text NOT NULL,
  statut text NOT NULL DEFAULT 'Brouillon' CHECK (statut IN ('Brouillon', 'Programmé', 'Envoyé', 'Annulé')),
  date_envoi timestamptz,
  nombre_destinataires integer DEFAULT 0,
  nombre_ouvertures integer DEFAULT 0,
  nombre_clics integer DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activation RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour newsletter_subscribers
CREATE POLICY "Newsletter subscribers gérés par admin"
  ON newsletter_subscribers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'gestionnaire')
    )
  );

-- Politiques RLS pour newsletter_campaigns
CREATE POLICY "Newsletter campaigns gérées par admin"
  ON newsletter_campaigns FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'gestionnaire')
    )
  );

-- Triggers pour updated_at
CREATE TRIGGER update_newsletter_subscribers_updated_at 
  BEFORE UPDATE ON newsletter_subscribers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_campaigns_updated_at 
  BEFORE UPDATE ON newsletter_campaigns 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour ajouter automatiquement les prospects qui s'abonnent à la newsletter
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

-- Données d'exemple pour la newsletter
INSERT INTO newsletter_subscribers (email, nom, entreprise, source) VALUES
('marie.dubois@grandpalace.com', 'Marie Dubois', 'Hôtel Le Grand Palace', 'Site web'),
('j.martin@cabinetmartin.fr', 'Jean Martin', 'Cabinet d''Avocats Martin & Associés', 'Contact'),
('contact@artgallery.fr', 'Galerie d''Art Moderne', 'Galerie d''Art Moderne', 'Manuel');

-- Exemple de campagne newsletter
INSERT INTO newsletter_campaigns (titre, contenu, sujet, statut, nombre_destinataires) VALUES
('Newsletter Janvier 2024', 'Découvrez nos nouvelles œuvres d''art disponibles ce mois-ci...', 'Nouvelles œuvres disponibles - Janvier 2024', 'Envoyé', 150);