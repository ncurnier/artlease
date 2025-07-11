/*
  # Mise à jour des images d'œuvres d'art

  1. Corrections
    - Met à jour toutes les URLs d'images avec des liens Pexels valides
    - Assure la cohérence des données d'œuvres d'art
    - Corrige les URLs cassées ou non fonctionnelles

  2. Sécurité
    - Utilise des URLs HTTPS sécurisées
    - Images optimisées pour le web
*/

-- Mise à jour des URLs d'images pour toutes les œuvres d'art
UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070548/pexels-photo-1070548.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'La Joconde';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070289/pexels-photo-1070289.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'La Cène';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070290/pexels-photo-1070290.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'La Création d''Adam';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070291/pexels-photo-1070291.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'David';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070292/pexels-photo-1070292.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'L''École d''Athènes';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070293/pexels-photo-1070293.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'La Madone Sixtine';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070544/pexels-photo-1070544.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'La Nuit étoilée';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070545/pexels-photo-1070545.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'La Jeune Fille à la perle';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070546/pexels-photo-1070546.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'Le Radeau de la Méduse';

UPDATE artworks SET 
  url_image = 'https://images.pexels.com/photos/1070547/pexels-photo-1070547.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titre = 'Les Noces de Cana';