import { supabase } from '../lib/supabase';

export const createAdminUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'admin'
        }
      }
    });

    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur admin:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur admin:', error);
    return { success: false, error: 'Erreur inconnue' };
  }
};

export const ensureAdminExists = async () => {
  const adminEmail = 'nicolascurnier@gmail.com';
  const adminPassword = 'ArtLease2025!';

  try {
    const { data: existingUser, error: checkError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', adminEmail)
      .eq('role', 'admin')
      .single();

    if (existingUser) {
      console.log('Utilisateur admin existe déjà');
      return { success: true, exists: true };
    }

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erreur lors de la vérification de l\'admin:', checkError);
      return { success: false, error: checkError.message };
    }

    const result = await createAdminUser(adminEmail, adminPassword);
    return { ...result, exists: false };
  } catch (error) {
    console.error('Erreur lors de la vérification/création de l\'admin:', error);
    return { success: false, error: 'Erreur inconnue' };
  }
};

export const populateArtworksData = async () => {
  try {
    const artworks = [
      {
        titre: 'La Joconde',
        artiste: 'Léonard de Vinci',
        date: '1503-1506',
        courant_artistique: 'Renaissance',
        description: 'Portrait emblématique représentant Lisa del Giocondo, célèbre pour son sourire énigmatique et le sfumato subtil du maître florentin.',
        biographie_artiste: 'Léonard de Vinci (1452-1519), peintre, inventeur et scientifique italien, incarne l\'idéal humaniste de la Renaissance.',
        prix_location_mois: 250,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070548/pexels-photo-1070548.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'La Cène',
        artiste: 'Léonard de Vinci',
        date: '1495-1498',
        courant_artistique: 'Renaissance',
        description: 'Fresque représentant le dernier repas du Christ avec ses apôtres, alliant composition dramatique et profondeur psychologique.',
        biographie_artiste: 'Léonard de Vinci (1452-1519) est célèbre pour ses chefs-d\'œuvre artistiques et ses découvertes scientifiques.',
        prix_location_mois: 200,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070547/pexels-photo-1070547.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'La Création d\'Adam',
        artiste: 'Michel-Ange',
        date: '1511',
        courant_artistique: 'Renaissance',
        description: 'Dieu tend la main à Adam dans une composition symbolisant l\'acte divin de la création.',
        biographie_artiste: 'Michel-Ange (1475-1564) est l\'un des plus grands artistes de la Renaissance, maître sculpteur, peintre et architecte.',
        prix_location_mois: 220,
        disponibilite: 'Réservé',
        url_image: 'https://images.pexels.com/photos/1070289/pexels-photo-1070289.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'David',
        artiste: 'Michel-Ange',
        date: '1501-1504',
        courant_artistique: 'Renaissance',
        description: 'Sculpture de marbre représentant le héros biblique David avant son combat contre Goliath.',
        biographie_artiste: 'Michel-Ange (1475-1564), figure emblématique de l\'art occidental, célèbre pour ses sculptures monumentales.',
        prix_location_mois: 300,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070544/pexels-photo-1070544.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'L\'École d\'Athènes',
        artiste: 'Raphaël',
        date: '1509-1511',
        courant_artistique: 'Renaissance',
        description: 'Grande fresque illustrant la philosophie antique avec Platon et Aristote au centre.',
        biographie_artiste: 'Raphaël (1483-1520), maître de la Haute Renaissance, connu pour ses fresques et son sens de l\'harmonie.',
        prix_location_mois: 210,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070290/pexels-photo-1070290.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'La Madone Sixtine',
        artiste: 'Raphaël',
        date: '1513-1514',
        courant_artistique: 'Renaissance',
        description: 'Tableau de la Vierge à l\'Enfant, symbole de la douceur et de l\'harmonie divine.',
        biographie_artiste: 'Raphaël, artiste de la Renaissance italienne, a marqué l\'histoire par ses compositions équilibrées et poétiques.',
        prix_location_mois: 180,
        disponibilite: 'En rotation',
        url_image: 'https://images.pexels.com/photos/1070291/pexels-photo-1070291.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'La Nuit étoilée',
        artiste: 'Vincent van Gogh',
        date: '1889',
        courant_artistique: 'Post-impressionnisme',
        description: 'Une des œuvres les plus célèbres de Van Gogh, représentant un ciel tourbillonnant au-dessus de Saint-Rémy.',
        biographie_artiste: 'Vincent van Gogh (1853-1890), peintre post-impressionniste néerlandais, maître des couleurs vibrantes et de l\'expressivité.',
        prix_location_mois: 240,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070545/pexels-photo-1070545.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'La Jeune Fille à la perle',
        artiste: 'Johannes Vermeer',
        date: '1665',
        courant_artistique: 'Baroque',
        description: 'Portrait lumineux d\'une jeune femme au regard énigmatique, surnommé la \'Mona Lisa du Nord\'.',
        biographie_artiste: 'Johannes Vermeer (1632-1675), peintre hollandais du Siècle d\'or, maître des scènes intimistes et de la lumière.',
        prix_location_mois: 200,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070546/pexels-photo-1070546.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'Le Radeau de la Méduse',
        artiste: 'Théodore Géricault',
        date: '1818-1819',
        courant_artistique: 'Romantisme',
        description: 'Peinture dramatique inspirée d\'un naufrage réel, symbole du romantisme français.',
        biographie_artiste: 'Théodore Géricault (1791-1824) est un pionnier du romantisme, célèbre pour ses toiles monumentales et engagées.',
        prix_location_mois: 230,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070292/pexels-photo-1070292.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        titre: 'Les Noces de Cana',
        artiste: 'Paolo Veronese',
        date: '1562-1563',
        courant_artistique: 'Renaissance vénitienne',
        description: 'Scène biblique illustrant le miracle de l\'eau changée en vin, chef-d\'œuvre de la peinture vénitienne.',
        biographie_artiste: 'Paolo Veronese (1528-1588), maître vénitien du maniérisme, célèbre pour ses compositions grandioses et festives.',
        prix_location_mois: 260,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1070293/pexels-photo-1070293.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ];

    const { data: existingArtworks, error: checkError } = await supabase
      .from('artworks')
      .select('titre, artiste')
      .limit(1);

    if (checkError) {
      console.error('Erreur lors de la vérification des œuvres:', checkError);
      return { success: false, error: checkError.message };
    }

    if (existingArtworks && existingArtworks.length > 0) {
      console.log('Des œuvres existent déjà dans la base de données');
      return { success: true, exists: true };
    }

    const { data, error } = await supabase
      .from('artworks')
      .insert(artworks);

    if (error) {
      console.error('Erreur lors de l\'insertion des œuvres:', error);
      return { success: false, error: error.message };
    }

    console.log('Œuvres d\'art ajoutées avec succès');
    return { success: true, data, exists: false };
  } catch (error) {
    console.error('Erreur lors de l\'ajout des œuvres:', error);
    return { success: false, error: 'Erreur inconnue' };
  }
};
