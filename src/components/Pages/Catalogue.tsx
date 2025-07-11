import React, { useState } from 'react';
import { Search, Filter, Eye, Calendar, Euro } from 'lucide-react';
import { useArtworks } from '../../hooks/useSupabaseData';
import type { Database } from '../../lib/supabase';

type Artwork = Database['public']['Tables']['artworks']['Row'];
interface CatalogueProps {
  onPageChange: (page: string) => void;
}

const Catalogue: React.FC<CatalogueProps> = ({ onPageChange }) => {
  const { artworks, loading, error } = useArtworks();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const periods = [...new Set(artworks.map(art => art.courant_artistique))];
  const statuses = [...new Set(artworks.map(art => art.disponibilite))];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artiste.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = !selectedPeriod || artwork.courant_artistique === selectedPeriod;
    const matchesStatus = !selectedStatus || artwork.disponibilite === selectedStatus;
    const matchesPrice = !priceRange || 
                        (priceRange === 'low' && artwork.prix_location_mois <= 200) ||
                        (priceRange === 'medium' && artwork.prix_location_mois > 200 && artwork.prix_location_mois <= 250) ||
                        (priceRange === 'high' && artwork.prix_location_mois > 250);

    return matchesSearch && matchesPeriod && matchesStatus && matchesPrice;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Réservé': return 'bg-red-100 text-red-800';
      case 'En rotation': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du catalogue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement du catalogue</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Catalogue des Œuvres d'Art
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre collection d'œuvres d'art classique disponibles à la location
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Period Filter */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Toutes les périodes</option>
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Tous les statuts</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Tous les prix</option>
              <option value="low">Moins de 200€</option>
              <option value="medium">200€ - 250€</option>
              <option value="high">Plus de 250€</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPeriod('');
                setSelectedStatus('');
                setPriceRange('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={artwork.url_image} 
                  alt={artwork.titre}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1070548/pexels-photo-1070548.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(artwork.disponibilite)}`}>
                    {artwork.disponibilite}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {artwork.titre}
                </h3>
                <p className="text-gray-600 mb-2">
                  Par {artwork.artiste}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {artwork.courant_artistique} • {artwork.date}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {artwork.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-yellow-600 font-semibold">
                    <Euro className="h-4 w-4" />
                    <span>{artwork.prix_location_mois}/mois</span>
                  </div>
                  <button
                    onClick={() => setSelectedArtwork(artwork)}
                    className="flex items-center space-x-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Voir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucune œuvre ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedArtwork.titre}
                </h2>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedArtwork.url_image} 
                    alt={selectedArtwork.titre}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Détails de l'œuvre</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="font-medium">Artiste:</span> {selectedArtwork.artiste}</p>
                      <p><span className="font-medium">Période:</span> {selectedArtwork.date}</p>
                      <p><span className="font-medium">Courant:</span> {selectedArtwork.courant_artistique}</p>
                      <p><span className="font-medium">Statut:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-sm ${getStatusColor(selectedArtwork.disponibilite)}`}>
                          {selectedArtwork.disponibilite}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedArtwork.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">À propos de l'artiste</h3>
                    <p className="text-gray-700">{selectedArtwork.biographie_artiste}</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-800">Prix de location</span>
                      <span className="text-2xl font-bold text-yellow-600">
                        {selectedArtwork.prix_location_mois}€/mois
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedArtwork(null);
                        onPageChange('contact');
                      }}
                      className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
                    >
                      Demander un Devis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogue;