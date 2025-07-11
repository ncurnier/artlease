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
  const { addToCart, isInCart } = useCart();
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
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', artworkId)
        .single();

      if (error) throw error;
      setArtwork(data);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'œuvre:', error);
      
      // Mock data for demo
      const mockArtwork: Artwork = {
        id: artworkId,
        titre: 'Abstraction Moderne #3',
        artiste: 'Marie Dubois',
        date: '2023',
        courant_artistique: 'Art Contemporain',
        description: 'Une œuvre abstraite captivante qui explore les relations entre couleur et forme. Cette pièce unique combine des techniques traditionnelles avec une approche moderne, créant un dialogue visuel riche et complexe.',
        biographie_artiste: 'Marie Dubois est une artiste contemporaine française reconnue pour ses œuvres abstraites. Diplômée des Beaux-Arts de Paris, elle expose régulièrement dans les galeries européennes.',
        prix_location_mois: 150,
        disponibilite: 'Disponible',
        url_image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800'
      };
      
      setArtwork(mockArtwork);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (artwork) {
      addToCart({
        id: artwork.id,
        title: artwork.titre,
        artist: artwork.artiste,
        price: artwork.prix_location_mois,
        image: artwork.url_image,
        duration: selectedDuration
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
              disabled={artwork.disponibilite !== 'Disponible' || isInCart(artwork.id)}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
                artwork.disponibilite !== 'Disponible'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isInCart(artwork.id)
                  ? 'bg-green-600 text-white'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {artwork.disponibilite !== 'Disponible'
                ? 'Non disponible'
                : isInCart(artwork.id)
                ? 'Ajouté au panier'
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