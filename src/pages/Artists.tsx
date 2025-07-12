import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Artist {
  id: string;
  name: string;
  bio: string;
  location: string;
  speciality: string;
  experience: string;
  website?: string;
  avatar?: string;
  artworks_count: number;
}

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('role', 'artist');

      if (error || !data || data.length === 0) {
        console.log('Using mock data for artists:', error?.message || 'No artists found');
        // Mock data fallback
        const mockArtists: Artist[] = [
        {
          id: '1',
          name: 'Marie Dubois',
          bio: 'Artiste contemporaine spécialisée dans l\'art abstrait et les installations.',
          location: 'Paris, France',
          speciality: 'Art Contemporain',
          experience: '15 ans',
          website: 'https://mariedubois.art',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
          artworks_count: 24
        },
        {
          id: '2',
          name: 'Jean-Pierre Martin',
          bio: 'Sculpteur reconnu, travaille principalement avec le bronze et le marbre.',
          location: 'Lyon, France',
          speciality: 'Sculpture',
          experience: '20 ans',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
          artworks_count: 18
        },
        {
          id: '3',
          name: 'Sophie Chen',
          bio: 'Photographe d\'art, explore les thèmes de l\'identité et de la mémoire.',
          location: 'Marseille, France',
          speciality: 'Photographie',
          experience: '12 ans',
          website: 'https://sophiechen.photo',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
          artworks_count: 32
        },
        {
          id: '4',
          name: 'Alexandre Rousseau',
          bio: 'Peintre impressionniste moderne, inspiré par les paysages urbains.',
          location: 'Bordeaux, France',
          speciality: 'Peinture',
          experience: '18 ans',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          artworks_count: 28
        }
        ];
        
        setArtists(mockArtists);
      } else {
        const formattedArtists: Artist[] = data.map(artist => ({
          id: artist.id,
          name: artist.nom || 'Artiste',
          bio: artist.bio || 'Artiste professionnel',
          location: artist.ville || 'France',
          speciality: artist.specialite || 'Art Contemporain',
          experience: artist.experience || 'Non spécifié',
          website: artist.portfolio || undefined,
          avatar: artist.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
          artworks_count: 0
        }));
        setArtists(formattedArtists);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des artistes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = !selectedSpeciality || artist.speciality === selectedSpeciality;
    return matchesSearch && matchesSpeciality;
  });

  const specialities = [...new Set(artists.map(artist => artist.speciality))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Artistes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les talents exceptionnels qui composent notre communauté d'artistes
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un artiste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedSpeciality}
            onChange={(e) => setSelectedSpeciality(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Toutes les spécialités</option>
            {specialities.map(speciality => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {artist.name}
                    </h3>
                    <p className="text-amber-600 font-medium">
                      {artist.speciality}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {artist.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {artist.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {artist.experience} d'expérience
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-2" />
                    {artist.artworks_count} œuvres
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                    Voir les œuvres
                  </button>
                  {artist.website && (
                    <a
                      href={artist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun artiste trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Artists;
