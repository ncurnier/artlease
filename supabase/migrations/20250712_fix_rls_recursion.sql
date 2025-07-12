
DROP POLICY IF EXISTS "Admin peut gérer tous les profils" ON user_profiles;

CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admin can manage all profiles"
  ON user_profiles FOR ALL
  TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Newsletter subscribers gérés par admin" ON newsletter_subscribers;
CREATE POLICY "Newsletter subscribers gérés par admin"
  ON newsletter_subscribers FOR ALL
  TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Newsletter campaigns gérées par admin" ON newsletter_campaigns;
CREATE POLICY "Newsletter campaigns gérées par admin"
  ON newsletter_campaigns FOR ALL
  TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Artworks modifiables par admin" ON artworks;
CREATE POLICY "Artworks modifiables par admin"
  ON artworks FOR ALL
  TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Prospects gérés par admin" ON prospects;
CREATE POLICY "Prospects gérés par admin"
  ON prospects FOR ALL
  TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Clients visibles par admin" ON clients;
CREATE POLICY "Clients visibles par admin"
  ON clients FOR ALL
  TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Formules modifiables par admin" ON formules;
CREATE POLICY "Formules modifiables par admin"
  ON formules FOR ALL
  TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Locations gérées par admin" ON locations;
CREATE POLICY "Locations gérées par admin"
  ON locations FOR ALL
  TO authenticated
  USING (is_admin_user());
