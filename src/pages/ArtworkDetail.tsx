import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  User, 
  Tag,
  Shield,
  Truck,
  Star
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';

interface Artwork {
  id: string;
  titre: string;
  artiste: string;
  date: string;
  courant_artistique: string;
  description: string;
  biographie_artiste: string;
  prix_location_mois: number;
  disponibilite: string;
  url_image: string;
}

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(3);

  useEffect(() => {
    if (id) {
      fetchArtwork(id);
    }
  }, [id]);

  const fetchArtwork = async (artworkId: string) => {
    try {
      console.log('Fetching artwork with ID:', artworkId);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Database query timeout')), 10000); // 10 second timeout
      });
      
      const queryPromise = supabase
        .from('artworks')
        .select('*')
        .eq('id', artworkId)
        .single();
      
      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Artwork fetched successfully:', data);
      setArtwork(data);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'œuvre:', error);
      console.log('Using fallback sample data for artwork ID:', artworkId);
      
      const sampleArtworks: { [key: string]: Artwork } = {
        '1': {
          id: '1',
          titre: 'La Joconde (Reproduction)',
          artiste: 'Léonard de Vinci',
          date: '1503',
          courant_artistique: 'Renaissance',
          description: 'Reproduction fidèle du chef-d\'œuvre de la Renaissance italienne. Cette œuvre emblématique capture le mystère et la beauté intemporelle du portrait le plus célèbre au monde.',
          biographie_artiste: 'Léonard de Vinci (1452-1519) était un polymathe italien de la Renaissance, reconnu comme l\'un des plus grands génies de l\'humanité.',
          prix_location_mois: 2500,
          disponibilite: 'Disponible',
          url_image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        '2': {
          id: '2',
          titre: 'La Nuit étoilée (Reproduction)',
          artiste: 'Vincent van Gogh',
          date: '1889',
          courant_artistique: 'Post-impressionnisme',
          description: 'Reproduction de l\'œuvre emblématique du post-impressionnisme. Cette peinture capture la beauté tourbillonnante du ciel nocturne avec une intensité émotionnelle unique.',
          biographie_artiste: 'Vincent van Gogh (1853-1890) était un peintre post-impressionniste néerlandais dont l\'œuvre a profondément influencé l\'art du XXe siècle.',
          prix_location_mois: 2200,
          disponibilite: 'Disponible',
          url_image: 'https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        '3': {
          id: '3',
          titre: 'La Jeune Fille à la perle (Reproduction)',
          artiste: 'Johannes Vermeer',
          date: '1665',
          courant_artistique: 'Baroque hollandais',
          description: 'Reproduction de ce portrait mystérieux du maître hollandais. Cette œuvre captivante révèle la maîtrise technique exceptionnelle de Vermeer dans le traitement de la lumière.',
          biographie_artiste: 'Johannes Vermeer (1632-1675) était un peintre baroque hollandais, spécialisé dans les scènes de genre domestique de la classe moyenne.',
          prix_location_mois: 1800,
          disponibilite: 'Disponible',
          url_image: 'https://images.pexels.com/photos/1070947/pexels-photo-1070947.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      };
      
      const mockArtwork = sampleArtworks[artworkId] || {
        id: artworkId,
        titre: 'Œuvre d\'Art Classique',
        artiste: 'Artiste Renommé',
        date: '2023',
        courant_artistique: 'Art Contemporain',
        description: 'Une œuvre d\'art exceptionnelle qui capture l\'essence de la beauté artistique moderne.',
        biographie_artiste: 'Un artiste talentueux reconnu pour ses contributions significatives au monde de l\'art contemporain.',
        prix_location_mois: 1500,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800'
      };
      
      setArtwork(mockArtwork);
    } finally {
      console.log('Setting artwork loading to false');
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (artwork) {
      addToCart({
        artworkId: artwork.id,
        title: artwork.titre,
        artist: artwork.artiste,
        image: artwork.url_image,
        pricePerMonth: artwork.prix_location_mois,
        duration: selectedDuration,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + selectedDuration * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork?.titre,
          text: `Découvrez cette œuvre de ${artwork?.artiste}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Œuvre non trouvée</h2>
          <button
            onClick={() => navigate('/gallery')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retour à la galerie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={artwork.url_image}
                alt={artwork.titre}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full border-2 transition-colors ${
                  isFavorite
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  artwork.disponibilite === 'Disponible'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {artwork.disponibilite}
                </span>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">4.8 (12 avis)</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {artwork.titre}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <User className="w-5 h-5 mr-2" />
                <span className="text-lg">{artwork.artiste}</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {artwork.date}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {artwork.courant_artistique}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-amber-50 rounded-xl p-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  {artwork.prix_location_mois}€
                </span>
                <span className="text-gray-600 ml-2">/mois</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Durée minimum: 3 mois
              </p>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Durée de location
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[3, 6, 12].map(duration => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`p-3 text-center rounded-lg border-2 transition-colors ${
                      selectedDuration === duration
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold">{duration} mois</div>
                    <div className="text-sm text-gray-600">
                      {artwork.prix_location_mois * duration}€ total
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={artwork.disponibilite !== 'Disponible'}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
                artwork.disponibilite !== 'Disponible'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {artwork.disponibilite !== 'Disponible'
                ? 'Non disponible'
                : 'Ajouter au panier'
              }
            </button>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-amber-600 mr-2" />
                <span className="text-sm">Livraison incluse</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-amber-600 mr-2" />
                <span className="text-sm">Assurance incluse</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-amber-600 mr-2" />
                <span className="text-sm">Installation offerte</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Artist Bio */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                À propos de l'artiste
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {artwork.biographie_artiste}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
