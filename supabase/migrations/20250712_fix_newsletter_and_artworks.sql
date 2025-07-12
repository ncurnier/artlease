
DROP POLICY IF EXISTS "Newsletter subscribers gérés par admin" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter campaigns gérées par admin" ON newsletter_campaigns;

CREATE POLICY "Allow newsletter subscription via RPC"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to read own newsletter subscription"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "Admin newsletter management"
  ON newsletter_subscribers FOR ALL
  TO authenticated
  USING (
    auth.email() = 'nicolascurnier@gmail.com'
  );

CREATE POLICY "Admin campaign management"
  ON newsletter_campaigns FOR ALL
  TO authenticated
  USING (
    auth.email() = 'nicolascurnier@gmail.com'
  );

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
('Les Noces de Cana', 'Paolo Veronese', '1562-1563', 'Renaissance vénitienne', 'Scène biblique illustrant le miracle de l''eau changée en vin, chef-d''œuvre de la peinture vénitienne.', 'Paolo Veronese (1528-1588), maître vénitien du maniérisme, célèbre pour ses compositions grandioses et festives.', 260, 'Disponible', 'https://images.pexels.com/photos/1070293/pexels-photo-1070293.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (titre, artiste) DO NOTHING;
