/*
  # Création du schéma ArtLease Pro

  1. Nouvelles Tables
    - `artworks` - Catalogue des œuvres d'art
    - `prospects` - Gestion des prospects
    - `clients` - Gestion des clients
    - `locations` - Gestion des locations
    - `formules` - Formules de location
    - `users` - Utilisateurs du système

  2. Sécurité
    - Activation RLS sur toutes les tables
    - Politiques d'accès basées sur les rôles
    - Authentification Supabase intégrée

  3. Données d'exemple
    - 10 œuvres d'art classiques
    - Formules de location prédéfinies
    - Utilisateurs de démonstration
*/

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des œuvres d'art
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  titre text NOT NULL,
  artiste text NOT NULL,
  date text NOT NULL,
  courant_artistique text NOT NULL,
  description text NOT NULL,
  biographie_artiste text NOT NULL,
  prix_location_mois integer NOT NULL,
  disponibilite text NOT NULL DEFAULT 'Disponible' CHECK (disponibilite IN ('Disponible', 'Réservé', 'En rotation')),
  url_image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des prospects
CREATE TABLE IF NOT EXISTS prospects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom text NOT NULL,
  entreprise text NOT NULL,
  email text UNIQUE NOT NULL,
  telephone text,
  statut text NOT NULL DEFAULT 'Nouveau' CHECK (statut IN ('Nouveau', 'Contacté', 'Relancé', 'Client converti')),
  source text NOT NULL DEFAULT 'Manuel' CHECK (source IN ('Newsletter', 'Contact', 'Manuel')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom text NOT NULL,
  entreprise text NOT NULL,
  email text UNIQUE NOT NULL,
  telephone text,
  adresse text,
  statut text NOT NULL DEFAULT 'Actif' CHECK (statut IN ('Actif', 'Inactif')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des formules de location
CREATE TABLE IF NOT EXISTS formules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom text NOT NULL,
  description text NOT NULL,
  prix_base integer NOT NULL,
  services_inclus text[] NOT NULL DEFAULT '{}',
  duree_minimum integer NOT NULL DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des locations
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  artwork_id uuid REFERENCES artworks(id) ON DELETE CASCADE,
  formule_id uuid REFERENCES formules(id) ON DELETE SET NULL,
  date_debut date NOT NULL,
  date_fin date NOT NULL,
  prix_mensuel integer NOT NULL,
  statut text NOT NULL DEFAULT 'En cours' CHECK (statut IN ('En cours', 'Terminée', 'Annulée')),
  services_inclus text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des utilisateurs (pour l'administration)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nom text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client', 'gestionnaire')),
  entreprise text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activation RLS
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE formules ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour artworks (lecture publique, écriture admin)
CREATE POLICY "Artworks visible par tous"
  ON artworks FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Artworks modifiables par admin"
  ON artworks FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'gestionnaire')
    )
  );

-- Politiques RLS pour prospects (admin seulement)
CREATE POLICY "Prospects gérés par admin"
  ON prospects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'gestionnaire')
    )
  );

-- Politiques RLS pour clients (admin et client propriétaire)
CREATE POLICY "Clients visibles par admin"
  ON clients FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'gestionnaire')
    )
  );

CREATE POLICY "Client peut voir ses propres données"
  ON clients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.email = clients.email
    )
  );

-- Politiques RLS pour formules (lecture publique, écriture admin)
CREATE POLICY "Formules visibles par tous"
  ON formules FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Formules modifiables par admin"
  ON formules FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'gestionnaire')
    )
  );

-- Politiques RLS pour locations
CREATE POLICY "Locations gérées par admin"
  ON locations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role IN ('admin', 'gestionnaire')
    )
  );

CREATE POLICY "Client peut voir ses locations"
  ON locations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients c
      JOIN user_profiles up ON up.email = c.email
      WHERE c.id = locations.client_id 
      AND up.id = auth.uid()
    )
  );

-- Politiques RLS pour user_profiles
CREATE POLICY "Utilisateurs peuvent voir leur profil"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin peut gérer tous les profils"
  ON user_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

-- Insertion des données d'exemple

-- Œuvres d'art
INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image) VALUES
('La Joconde', 'Léonard de Vinci', '1503-1506', 'Renaissance', 'Portrait emblématique représentant Lisa del Giocondo, célèbre pour son sourire énigmatique et le sfumato subtil du maître florentin.', 'Léonard de Vinci (1452-1519), peintre, inventeur et scientifique italien, incarne l''idéal humaniste de la Renaissance.', 250, 'Disponible', 'https://images.pexels.com/photos/1070548/pexels-photo-1070548.jpeg?auto=compress&cs=tinysrgb&w=800'),
('La Cène', 'Léonard de Vinci', '1495-1498', 'Renaissance', 'Fresque représentant le dernier repas du Christ avec ses apôtres, alliant composition dramatique et profondeur psychologique.', 'Léonard de Vinci (1452-1519) est célèbre pour ses chefs-d''œuvre artistiques et ses découvertes scientifiques.', 200, 'Disponible', 'https://images.pexels.com/photos/1070547/pexels-photo-1070547.jpeg?auto=compress&cs=tinysrgb&w=800'),
('La Création d''Adam', 'Michel-Ange', '1511', 'Renaissance', 'Dieu tend la main à Adam dans une composition symbolisant l''acte divin de la création.', 'Michel-Ange (1475-1564) est l''un des plus grands artistes de la Renaissance, maître sculpteur, peintre et architecte.', 220, 'Réservé', 'https://images.pexels.com/photos/1070289/pexels-photo-1070289.jpeg?auto=compress&cs=tinysrgb&w=800'),
('David', 'Michel-Ange', '1501-1504', 'Renaissance', 'Sculpture de marbre représentant le héros biblique David avant son combat contre Goliath.', 'Michel-Ange (1475-1564), figure emblématique de l''art occidental, célèbre pour ses sculptures monumentales.', 300, 'Disponible', 'https://images.pexels.com/photos/1070544/pexels-photo-1070544.jpeg?auto=compress&cs=tinysrgb&w=800'),
('L''École d''Athènes', 'Raphaël', '1509-1511', 'Renaissance', 'Grande fresque illustrant la philosophie antique avec Platon et Aristote au centre.', 'Raphaël (1483-1520), maître de la Haute Renaissance, connu pour ses fresques et son sens de l''harmonie.', 210, 'Disponible', 'https://images.pexels.com/photos/1070290/pexels-photo-1070290.jpeg?auto=compress&cs=tinysrgb&w=800'),
('La Madone Sixtine', 'Raphaël', '1513-1514', 'Renaissance', 'Tableau de la Vierge à l''Enfant, symbole de la douceur et de l''harmonie divine.', 'Raphaël, artiste de la Renaissance italienne, a marqué l''histoire par ses compositions équilibrées et poétiques.', 180, 'En rotation', 'https://images.pexels.com/photos/1070291/pexels-photo-1070291.jpeg?auto=compress&cs=tinysrgb&w=800'),
('La Nuit étoilée', 'Vincent van Gogh', '1889', 'Post-impressionnisme', 'Une des œuvres les plus célèbres de Van Gogh, représentant un ciel tourbillonnant au-dessus de Saint-Rémy.', 'Vincent van Gogh (1853-1890), peintre post-impressionniste néerlandais, maître des couleurs vibrantes et de l''expressivité.', 240, 'Disponible', 'https://images.pexels.com/photos/1070545/pexels-photo-1070545.jpeg?auto=compress&cs=tinysrgb&w=800'),
('La Jeune Fille à la perle', 'Johannes Vermeer', '1665', 'Baroque', 'Portrait lumineux d''une jeune femme au regard énigmatique, surnommé la ''Mona Lisa du Nord''.', 'Johannes Vermeer (1632-1675), peintre hollandais du Siècle d''or, maître des scènes intimistes et de la lumière.', 200, 'Disponible', 'https://images.pexels.com/photos/1070546/pexels-photo-1070546.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Le Radeau de la Méduse', 'Théodore Géricault', '1818-1819', 'Romantisme', 'Peinture dramatique inspirée d''un naufrage réel, symbole du romantisme français.', 'Théodore Géricault (1791-1824) est un pionnier du romantisme, célèbre pour ses toiles monumentales et engagées.', 230, 'Disponible', 'https://images.pexels.com/photos/1070292/pexels-photo-1070292.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Les Noces de Cana', 'Paolo Veronese', '1562-1563', 'Renaissance vénitienne', 'Scène biblique illustrant le miracle de l''eau changée en vin, chef-d''œuvre de la peinture vénitienne.', 'Paolo Veronese (1528-1588), maître vénitien du maniérisme, célèbre pour ses compositions grandioses et festives.', 260, 'Disponible', 'https://images.pexels.com/photos/1070293/pexels-photo-1070293.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Formules de location
INSERT INTO formules (nom, description, prix_base, services_inclus, duree_minimum) VALUES
('Formule Essentielle', 'Location simple avec transport et assurance inclus', 150, ARRAY['Transport', 'Assurance'], 3),
('Formule Confort', 'Installation professionnelle et rotation trimestrielle', 200, ARRAY['Transport', 'Assurance', 'Accrochage', 'Rotation trimestrielle'], 6),
('Formule Premium', 'Service complet avec mise en scène et rotation mensuelle', 300, ARRAY['Transport', 'Assurance', 'Accrochage', 'Mise en scène', 'Rotation mensuelle', 'Conseil artistique'], 12);

-- Prospects d'exemple
INSERT INTO prospects (nom, entreprise, email, telephone, statut, source) VALUES
('Marie Dubois', 'Hôtel Le Grand Palace', 'marie.dubois@grandpalace.com', '01 42 33 44 55', 'Nouveau', 'Newsletter'),
('Jean Martin', 'Cabinet d''Avocats Martin & Associés', 'j.martin@cabinetmartin.fr', '01 45 67 89 10', 'Contacté', 'Contact'),
('Sophie Lemoine', 'Espace de Coworking Innovation', 'sophie@innovation-space.com', '01 56 78 90 12', 'Client converti', 'Manuel');

-- Clients d'exemple
INSERT INTO clients (nom, entreprise, email, telephone, adresse) VALUES
('Sophie Lemoine', 'Espace de Coworking Innovation', 'sophie@innovation-space.com', '01 56 78 90 12', '123 Rue de Rivoli, 75001 Paris'),
('Pierre Durand', 'Clinique Dentaire Moderne', 'p.durand@clinique-moderne.fr', '01 47 58 69 70', '456 Avenue des Champs-Élysées, 75008 Paris');

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_artworks_updated_at BEFORE UPDATE ON artworks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_formules_updated_at BEFORE UPDATE ON formules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();