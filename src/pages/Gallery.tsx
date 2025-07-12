import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useArtworks } from '../hooks/useSupabaseData';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

console.log('Gallery component file loaded');

const Gallery: React.FC = () => {
  console.log('Gallery component function called');
  
  const { artworks, loading, error } = useArtworks();
  console.log('useArtworks hook called - artworks:', artworks?.length || 0, 'loading:', loading, 'error:', error);
  
  const { addToCart } = useCart();
  console.log('useCart hook called');
  
  const { user } = useAuth();
  console.log('useAuth hook called');
  
  console.log('Gallery component rendering - artworks:', artworks?.length || 0, 'loading:', loading, 'error:', error);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('artlease-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('artlease-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const categories = [...new Set(artworks.map(art => art.courant_artistique))];
  const artists = [...new Set(artworks.map(art => art.artiste))];

  const filteredArtworks = artworks
    .filter(artwork => {
      const matchesSearch = artwork.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artwork.artiste.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || artwork.courant_artistique === selectedCategory;
      const matchesArtist = !selectedArtist || artwork.artiste === selectedArtist;
      const matchesPrice = !priceRange || 
                          (priceRange === 'low' && artwork.prix_location_mois <= 200) ||
                          (priceRange === 'medium' && artwork.prix_location_mois > 200 && artwork.prix_location_mois <= 300) ||
                          (priceRange === 'high' && artwork.prix_location_mois > 300);

      return matchesSearch && matchesCategory && matchesArtist && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.prix_location_mois - b.prix_location_mois;
        case 'price-high':
          return b.prix_location_mois - a.prix_location_mois;
        case 'artist':
          return a.artiste.localeCompare(b.artiste);
        case 'title':
        default:
          return a.titre.localeCompare(b.titre);
      }
    });

  const toggleFavorite = (artworkId: string) => {
    setFavorites(prev => 
      prev.includes(artworkId) 
        ? prev.filter(id => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  const handleAddToCart = (artwork: any) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour ajouter au panier');
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3); // Default 3 months

    addToCart({
      artworkId: artwork.id,
      title: artwork.titre,
      artist: artwork.artiste,
      image: artwork.url_image,
      pricePerMonth: artwork.prix_location_mois,
      duration: 3,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
  };

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
          <p className="text-gray-600">Chargement de la galerie...</p>
        </div>
      </div>
    );
  }

  if (error && artworks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement de la galerie</p>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Galerie d'Œuvres d'Art
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre collection exceptionnelle d'œuvres d'art disponibles à la location
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une œuvre, un artiste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Artist Filter */}
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Tous les artistes</option>
              {artists.map(artist => (
                <option key={artist} value={artist}>{artist}</option>
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
              <option value="medium">200€ - 300€</option>
              <option value="high">Plus de 300€</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="title">Trier par titre</option>
              <option value="artist">Trier par artiste</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedArtist('');
                  setPriceRange('');
                  setSortBy('title');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Réinitialiser
              </button>
              <span className="text-sm text-gray-600">
                {filteredArtworks.length} œuvre(s) trouvée(s)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Artworks Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative">
                  <img 
                    src={artwork.url_image} 
                    alt={artwork.titre}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center';
                    }}
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(artwork.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.includes(artwork.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(artwork.disponibilite)}`}>
                      {artwork.disponibilite}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                    {artwork.titre}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Par {artwork.artiste}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {artwork.courant_artistique} • {artwork.date}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-yellow-600">
                      {artwork.prix_location_mois}€
                      <span className="text-sm font-normal text-gray-500">/mois</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/oeuvre/${artwork.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Voir</span>
                    </Link>
                    {artwork.disponibilite === 'Disponible' && (
                      <button
                        onClick={() => handleAddToCart(artwork)}
                        className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Louer</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <img 
                      src={artwork.url_image} 
                      alt={artwork.titre}
                      className="w-full h-64 md:h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(artwork.disponibilite)}`}>
                        {artwork.disponibilite}
                      </span>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                          {artwork.titre}
                        </h3>
                        <p className="text-lg text-gray-600 mb-2">
                          Par {artwork.artiste}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {artwork.courant_artistique} • {artwork.date}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(artwork.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(artwork.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {artwork.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-yellow-600">
                        {artwork.prix_location_mois}€
                        <span className="text-lg font-normal text-gray-500">/mois</span>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Link
                          to={`/oeuvre/${artwork.id}`}
                          className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Voir Détails</span>
                        </Link>
                        {artwork.disponibilite === 'Disponible' && (
                          <button
                            onClick={() => handleAddToCart(artwork)}
                            className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Ajouter au Panier</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucune œuvre trouvée
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
