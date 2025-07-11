-- Supprime la policy existante pour éviter les doublons
DROP POLICY IF EXISTS "Allow access to own profile" ON user_profiles;

-- Crée une policy simple qui autorise chaque utilisateur à voir son propre profil
CREATE POLICY "Allow access to own profile"
ON user_profiles
FOR SELECT USING (
  auth.uid() = id
);

-- Ajoute la colonne 'verified' si elle n'existe pas déjà
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT FALSE;
