import React, { useState } from 'react';
import { User, Calendar, FileText, Settings, CreditCard } from 'lucide-react';
import { useLocations, useArtworks } from '../../hooks/useSupabaseData';

interface ClientSpaceProps {
  onPageChange: (page: string) => void;
}

const ClientSpace: React.FC<ClientSpaceProps> = ({ onPageChange }) => {
  const { locations, loading: locationsLoading } = useLocations();
  const { artworks, loading: artworksLoading } = useArtworks();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data since we removed auth
  const mockUser = {
    nom: 'Client Démo',
    email: 'client@demo.com',
    entreprise: 'Entreprise Démo'
  };

  if (locationsLoading || artworksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  // Get client's current locations
  const clientLocations = locations.filter(location => 
    location.statut === 'En cours'
  );

  const getArtworkById = (id: string) => artworks.find(artwork => artwork.id === id);

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: <User className="h-5 w-5" /> },
    { id: 'locations', label: 'Mes Locations', icon: <Calendar className="h-5 w-5" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-5 w-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Espace Client
              </h1>
              <p className="text-gray-600 mt-1">
                Bienvenue, {mockUser.nom}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Entreprise</p>
              <p className="font-semibold text-gray-800">{mockUser.entreprise}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Locations Actives</h3>
                    <p className="text-3xl font-bold text-yellow-600">{clientLocations.length}</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Coût Mensuel</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {clientLocations.reduce((sum, location) => sum + location.prix_mensuel, 0)}€
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Prochaine Rotation</h3>
                    <p className="text-3xl font-bold text-green-600">15 jours</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">Œuvres Actuelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clientLocations.map((location) => {
                      const artwork = getArtworkById(location.artwork_id);
                      return artwork ? (
                        <div key={location.id} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={artwork.url_image} 
                              alt={artwork.titre}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="font-medium text-gray-800">{artwork.titre}</h4>
                              <p className="text-sm text-gray-600">par {artwork.artiste}</p>
                              <p className="text-sm text-yellow-600">{location.prix_mensuel}€/mois</p>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Locations Tab */}
            {activeTab === 'locations' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Mes Locations en Cours</h3>
                <div className="space-y-4">
                  {clientLocations.map((location) => {
                    const artwork = getArtworkById(location.artwork_id);
                    return artwork ? (
                      <div key={location.id} className="bg-white border rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={artwork.url_image} 
                              alt={artwork.titre}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg">{artwork.titre}</h4>
                              <p className="text-gray-600">par {artwork.artiste}</p>
                              <p className="text-sm text-gray-500">{artwork.courant_artistique}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-yellow-600">{location.prix_mensuel}€/mois</p>
                            <p className="text-sm text-gray-500">
                              Du {new Date(location.date_debut).toLocaleDateString()} 
                              au {new Date(location.date_fin).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <h5 className="font-medium text-gray-800 mb-2">Services inclus :</h5>
                          <div className="flex flex-wrap gap-2">
                            {location.services_inclus.map((service, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Mes Documents</h3>
                <div className="space-y-4">
                  {clientLocations.map((location) => {
                    const artwork = getArtworkById(location.artwork_id);
                    return artwork ? (
                      <div key={location.id} className="bg-white border rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{artwork.titre}</h4>
                            <p className="text-sm text-gray-600">Contrat de location</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                              Télécharger
                            </button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                              Voir
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Paramètres du Compte</h3>
                
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-4">Informations Personnelles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input 
                        type="text" 
                        value={mockUser.nom} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        value={mockUser.email} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-4">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-yellow-600" defaultChecked />
                      <span className="ml-2 text-gray-700">Email pour les rotations d'œuvres</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-yellow-600" defaultChecked />
                      <span className="ml-2 text-gray-700">Newsletter ArtLease Pro</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox text-yellow-600" />
                      <span className="ml-2 text-gray-700">Nouvelles œuvres disponibles</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSpace;