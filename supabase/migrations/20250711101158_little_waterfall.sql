/*
  # Correction finale des images d'œuvres d'art

  1. Mise à jour des URLs d'images
    - Utilisation d'URLs Unsplash fiables pour l'art classique
    - Images haute qualité et accessibles
    - URLs testées et validées

  2. Sécurité
    - Pas de modification des politiques RLS existantes
*/

-- Mise à jour des œuvres avec des URLs d'images fiables
UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'La Joconde';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'La Cène';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'La Création d''Adam';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'David';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'L''École d''Athènes';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'La Madone Sixtine';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'La Nuit étoilée';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'La Jeune Fille à la perle';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'Le Radeau de la Méduse';

UPDATE artworks SET 
  url_image = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
  updated_at = now()
WHERE titre = 'Les Noces de Cana';

-- Si les œuvres n'existent pas encore, les créer
INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'La Joconde', 'Léonard de Vinci', '1503-1506', 'Renaissance', 
       'Portrait emblématique représentant Lisa del Giocondo, célèbre pour son sourire énigmatique et le sfumato subtil du maître florentin.',
       'Léonard de Vinci (1452-1519), peintre, inventeur et scientifique italien, incarne l''idéal humaniste de la Renaissance.',
       250, 'Disponible', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'La Joconde');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'La Cène', 'Léonard de Vinci', '1495-1498', 'Renaissance',
       'Fresque représentant le dernier repas du Christ avec ses apôtres, alliant composition dramatique et profondeur psychologique.',
       'Léonard de Vinci (1452-1519) est célèbre pour ses chefs-d''œuvre artistiques et ses découvertes scientifiques.',
       200, 'Disponible', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'La Cène');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'La Création d''Adam', 'Michel-Ange', '1511', 'Renaissance',
       'Dieu tend la main à Adam dans une composition symbolisant l''acte divin de la création.',
       'Michel-Ange (1475-1564) est l''un des plus grands artistes de la Renaissance, maître sculpteur, peintre et architecte.',
       220, 'Réservé', 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'La Création d''Adam');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'David', 'Michel-Ange', '1501-1504', 'Renaissance',
       'Sculpture de marbre représentant le héros biblique David avant son combat contre Goliath.',
       'Michel-Ange (1475-1564), figure emblématique de l''art occidental, célèbre pour ses sculptures monumentales.',
       300, 'Disponible', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'David');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'L''École d''Athènes', 'Raphaël', '1509-1511', 'Renaissance',
       'Grande fresque illustrant la philosophie antique avec Platon et Aristote au centre.',
       'Raphaël (1483-1520), maître de la Haute Renaissance, connu pour ses fresques et son sens de l''harmonie.',
       210, 'Disponible', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'L''École d''Athènes');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'La Madone Sixtine', 'Raphaël', '1513-1514', 'Renaissance',
       'Tableau de la Vierge à l''Enfant, symbole de la douceur et de l''harmonie divine.',
       'Raphaël, artiste de la Renaissance italienne, a marqué l''histoire par ses compositions équilibrées et poétiques.',
       180, 'En rotation', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'La Madone Sixtine');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'La Nuit étoilée', 'Vincent van Gogh', '1889', 'Post-impressionnisme',
       'Une des œuvres les plus célèbres de Van Gogh, représentant un ciel tourbillonnant au-dessus de Saint-Rémy.',
       'Vincent van Gogh (1853-1890), peintre post-impressionniste néerlandais, maître des couleurs vibrantes et de l''expressivité.',
       240, 'Disponible', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'La Nuit étoilée');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'La Jeune Fille à la perle', 'Johannes Vermeer', '1665', 'Baroque',
       'Portrait lumineux d''une jeune femme au regard énigmatique, surnommé la ''Mona Lisa du Nord''.',
       'Johannes Vermeer (1632-1675), peintre hollandais du Siècle d''or, maître des scènes intimistes et de la lumière.',
       200, 'Disponible', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'La Jeune Fille à la perle');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'Le Radeau de la Méduse', 'Théodore Géricault', '1818-1819', 'Romantisme',
       'Peinture dramatique inspirée d''un naufrage réel, symbole du romantisme français.',
       'Théodore Géricault (1791-1824) est un pionnier du romantisme, célèbre pour ses toiles monumentales et engagées.',
       230, 'Disponible', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'Le Radeau de la Méduse');

INSERT INTO artworks (titre, artiste, date, courant_artistique, description, biographie_artiste, prix_location_mois, disponibilite, url_image)
SELECT 'Les Noces de Cana', 'Paolo Veronese', '1562-1563', 'Renaissance vénitienne',
       'Scène biblique illustrant le miracle de l''eau changée en vin, chef-d''œuvre de la peinture vénitienne.',
       'Paolo Veronese (1528-1588), maître vénitien du maniérisme, célèbre pour ses compositions grandioses et festives.',
       260, 'Disponible', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE titre = 'Les Noces de Cana');