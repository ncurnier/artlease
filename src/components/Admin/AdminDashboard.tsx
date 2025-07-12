import React, { useState } from 'react';
import { BarChart3, Users, Palette, Calendar, FileText, Settings, Plus, Edit, Trash2, Eye, Mail } from 'lucide-react';
import { useProspects, useClients, useArtworks, useLocations, useArtworkManagement } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';
import NewsletterManager from './NewsletterManager';

interface AdminDashboardProps {
  onPageChange: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onPageChange }) => {
  const { prospects, loading: prospectsLoading, updateProspect, deleteProspect } = useProspects();
  const { clients, loading: clientsLoading, updateClient, deleteClient, createClient } = useClients();
  const { artworks, loading: artworksLoading, refetch: refetchArtworks } = useArtworks();
  const { locations, loading: locationsLoading, updateLocation, deleteLocation, createLocation } = useLocations();
  const { createArtwork, updateArtwork, deleteArtwork } = useArtworkManagement();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewProspect, setShowNewProspect] = useState(false);
  const [showNewClient, setShowNewClient] = useState(false);
  const [showNewArtwork, setShowNewArtwork] = useState(false);
  const [showNewLocation, setShowNewLocation] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Forms state
  const [prospectForm, setProspectForm] = useState({
    nom: '',
    entreprise: '',
    email: '',
    telephone: '',
    statut: 'Nouveau' as const,
    source: 'Manuel' as const
  });

  const [clientForm, setClientForm] = useState({
    nom: '',
    entreprise: '',
    email: '',
    telephone: '',
    adresse: '',
    statut: 'Actif' as const
  });

  const [artworkForm, setArtworkForm] = useState({
    titre: '',
    artiste: '',
    date: '',
    courant_artistique: '',
    description: '',
    biographie_artiste: '',
    prix_location_mois: 0,
    disponibilite: 'Disponible' as const,
    url_image: ''
  });

  const [locationForm, setLocationForm] = useState({
    client_id: '',
    artwork_id: '',
    date_debut: '',
    date_fin: '',
    prix_mensuel: 0,
    statut: 'En cours' as const,
    services_inclus: [] as string[]
  });

  // Mock admin user
  const mockUser = {
    nom: 'Admin Démo',
    role: 'admin'
  };

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'prospects', label: 'Prospects', icon: <Users className="h-5 w-5" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="h-5 w-5" /> },
    { id: 'artworks', label: 'Œuvres', icon: <Palette className="h-5 w-5" /> },
    { id: 'locations', label: 'Locations', icon: <Calendar className="h-5 w-5" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-5 w-5" /> },
    { id: 'newsletter', label: 'Newsletter', icon: <Mail className="h-5 w-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="h-5 w-5" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800';
      case 'Contacté': return 'bg-yellow-100 text-yellow-800';
      case 'Relancé': return 'bg-orange-100 text-orange-800';
      case 'Client converti': return 'bg-green-100 text-green-800';
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Réservé': return 'bg-red-100 text-red-800';
      case 'En rotation': return 'bg-yellow-100 text-yellow-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Terminée': return 'bg-gray-100 text-gray-800';
      case 'Annulée': return 'bg-red-100 text-red-800';
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'Inactif': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle form submissions
  const handleCreateProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('prospects')
        .insert([prospectForm])
        .select()
        .single();

      if (error) throw error;
      
      setProspectForm({
        nom: '',
        entreprise: '',
        email: '',
        telephone: '',
        statut: 'Nouveau',
        source: 'Manuel'
      });
      setShowNewProspect(false);
      window.location.reload(); // Refresh to show new data
    } catch (error) {
      console.error('Error creating prospect:', error);
      alert('Erreur lors de la création du prospect');
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient(clientForm);
      setClientForm({
        nom: '',
        entreprise: '',
        email: '',
        telephone: '',
        adresse: '',
        statut: 'Actif'
      });
      setShowNewClient(false);
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Erreur lors de la création du client');
    }
  };

  const handleCreateArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArtwork(artworkForm);
      setArtworkForm({
        titre: '',
        artiste: '',
        date: '',
        courant_artistique: '',
        description: '',
        biographie_artiste: '',
        prix_location_mois: 0,
        disponibilite: 'Disponible',
        url_image: ''
      });
      setShowNewArtwork(false);
      refetchArtworks();
    } catch (error) {
      console.error('Error creating artwork:', error);
      alert('Erreur lors de la création de l\'œuvre');
    }
  };

  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLocation(locationForm);
      setLocationForm({
        client_id: '',
        artwork_id: '',
        date_debut: '',
        date_fin: '',
        prix_mensuel: 0,
        statut: 'En cours',
        services_inclus: []
      });
      setShowNewLocation(false);
    } catch (error) {
      console.error('Error creating location:', error);
      alert('Erreur lors de la création de la location');
    }
  };

  // Handle updates
  const handleUpdateProspectStatus = async (id: string, newStatus: string) => {
    try {
      await updateProspect(id, { statut: newStatus as any });
    } catch (error) {
      console.error('Error updating prospect:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteProspect = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce prospect ?')) {
      try {
        await deleteProspect(id);
      } catch (error) {
        console.error('Error deleting prospect:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await deleteClient(id);
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleDeleteArtwork = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette œuvre ?')) {
      try {
        await deleteArtwork(id);
        refetchArtworks();
      } catch (error) {
        console.error('Error deleting artwork:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette location ?')) {
      try {
        await deleteLocation(id);
      } catch (error) {
        console.error('Error deleting location:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const loading = prospectsLoading || clientsLoading || artworksLoading || locationsLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Administration ArtLease Pro
              </h1>
              <p className="text-gray-600 mt-1">
                Bienvenue, {mockUser.nom}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Rôle</p>
              <p className="font-semibold text-gray-800 capitalize">{mockUser.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Prospects</h3>
                    <p className="text-3xl font-bold text-blue-600">{prospects.length}</p>
                    <p className="text-sm text-gray-600">Total prospects</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Clients Actifs</h3>
                    <p className="text-3xl font-bold text-green-600">{clients.filter(c => c.statut === 'Actif').length}</p>
                    <p className="text-sm text-gray-600">Sur {clients.length} total</p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Œuvres</h3>
                    <p className="text-3xl font-bold text-yellow-600">{artworks.length}</p>
                    <p className="text-sm text-gray-600">{artworks.filter(a => a.disponibilite === 'Disponible').length} disponibles</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Locations</h3>
                    <p className="text-3xl font-bold text-purple-600">{locations.length}</p>
                    <p className="text-sm text-gray-600">{locations.filter(l => l.statut === 'En cours').length} en cours</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Derniers Prospects</h3>
                    <div className="space-y-3">
                      {prospects.slice(0, 3).map((prospect) => (
                        <div key={prospect.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">{prospect.nom}</p>
                            <p className="text-sm text-gray-600">{prospect.entreprise}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(prospect.statut)}`}>
                            {prospect.statut}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Œuvres Populaires</h3>
                    <div className="space-y-3">
                      {artworks.slice(0, 3).map((artwork) => (
                        <div key={artwork.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img 
                            src={artwork.url_image} 
                            alt={artwork.titre}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center';
                            }}
                          />
                          <div>
                            <p className="font-medium text-gray-800">{artwork.titre}</p>
                            <p className="text-sm text-gray-600">{artwork.artiste}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Prospects Tab */}
            {activeTab === 'prospects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Gestion des Prospects</h3>
                  <button 
                    onClick={() => setShowNewProspect(true)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nouveau Prospect</span>
                  </button>
                </div>

                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nom / Entreprise
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Source
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {prospects.map((prospect) => (
                          <tr key={prospect.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{prospect.nom}</div>
                                <div className="text-sm text-gray-500">{prospect.entreprise}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{prospect.email}</div>
                              <div className="text-sm text-gray-500">{prospect.telephone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={prospect.statut}
                                onChange={(e) => handleUpdateProspectStatus(prospect.id, e.target.value)}
                                className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(prospect.statut)}`}
                              >
                                <option value="Nouveau">Nouveau</option>
                                <option value="Contacté">Contacté</option>
                                <option value="Relancé">Relancé</option>
                                <option value="Client converti">Client converti</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {prospect.source}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => setEditingItem(prospect)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => setEditingItem(prospect)}
                                  className="text-yellow-600 hover:text-yellow-900"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProspect(prospect.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Gestion des Clients</h3>
                  <button 
                    onClick={() => setShowNewClient(true)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nouveau Client</span>
                  </button>
                </div>

                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date création
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {clients.map((client) => (
                          <tr key={client.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{client.nom}</div>
                                <div className="text-sm text-gray-500">{client.entreprise}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{client.email}</div>
                              <div className="text-sm text-gray-500">{client.telephone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.statut)}`}>
                                {client.statut}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(client.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => setEditingItem(client)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => setEditingItem(client)}
                                  className="text-yellow-600 hover:text-yellow-900"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteClient(client.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Artworks Tab */}
            {activeTab === 'artworks' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Gestion des Œuvres</h3>
                  <button 
                    onClick={() => setShowNewArtwork(true)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nouvelle Œuvre</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks.map((artwork) => (
                    <div key={artwork.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={artwork.url_image} 
                        alt={artwork.titre}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center';
                        }}
                      />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{artwork.titre}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(artwork.disponibilite)}`}>
                            {artwork.disponibilite}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{artwork.artiste}</p>
                        <p className="text-sm text-gray-500 mb-2">{artwork.courant_artistique}</p>
                        <p className="text-lg font-semibold text-yellow-600 mb-3">{artwork.prix_location_mois}€/mois</p>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setEditingItem(artwork)}
                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Voir</span>
                          </button>
                          <button 
                            onClick={() => setEditingItem(artwork)}
                            className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Modifier</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteArtwork(artwork.id)}
                            className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Locations Tab */}
            {activeTab === 'locations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Gestion des Locations</h3>
                  <button 
                    onClick={() => setShowNewLocation(true)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nouvelle Location</span>
                  </button>
                </div>

                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Œuvre
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Période
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {locations.map((location) => {
                          const client = clients.find(c => c.id === location.client_id);
                          const artwork = artworks.find(a => a.id === location.artwork_id);
                          
                          return (
                            <tr key={location.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{client?.nom || 'Client inconnu'}</div>
                                <div className="text-sm text-gray-500">{client?.entreprise || 'N/A'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{artwork?.titre || 'Œuvre inconnue'}</div>
                                <div className="text-sm text-gray-500">{artwork?.artiste || 'N/A'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(location.date_debut).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  au {new Date(location.date_fin).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{location.prix_mensuel}€/mois</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(location.statut)}`}>
                                  {location.statut}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => setEditingItem(location)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => setEditingItem(location)}
                                    className="text-yellow-600 hover:text-yellow-900"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteLocation(location.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Gestion des Documents</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Contrats</h4>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{locations.length}</p>
                    <p className="text-sm text-gray-600">Contrats actifs</p>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Générer Contrat
                    </button>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Factures</h4>
                    <p className="text-3xl font-bold text-green-600 mb-2">24</p>
                    <p className="text-sm text-gray-600">Ce mois</p>
                    <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Créer Facture
                    </button>
                  </div>
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Devis</h4>
                    <p className="text-3xl font-bold text-yellow-600 mb-2">8</p>
                    <p className="text-sm text-gray-600">En attente</p>
                    <button className="mt-4 w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                      Nouveau Devis
                    </button>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Actions Rapides</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Générer Contrat
                    </button>
                    <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                      Créer Facture
                    </button>
                    <button className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition-colors">
                      Nouveau Devis
                    </button>
                    <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
                      Export Excel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter Tab */}
            {activeTab === 'newsletter' && (
              <NewsletterManager />
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Paramètres Système</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Utilisateurs</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Admin Principal</p>
                          <p className="text-sm text-gray-600">admin@artlease.com</p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Admin</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Gestionnaire Catalogue</p>
                          <p className="text-sm text-gray-600">gestionnaire@artlease.com</p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Gestionnaire</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Configuration</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Durée minimum de location (mois)
                        </label>
                        <input 
                          type="number" 
                          defaultValue="3" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          TVA (%)
                        </label>
                        <input 
                          type="number" 
                          defaultValue="20" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {/* New Prospect Modal */}
        {showNewProspect && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Nouveau Prospect</h3>
                  <button
                    onClick={() => setShowNewProspect(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCreateProspect} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                    <input
                      type="text"
                      value={prospectForm.nom}
                      onChange={(e) => setProspectForm({...prospectForm, nom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise *</label>
                    <input
                      type="text"
                      value={prospectForm.entreprise}
                      onChange={(e) => setProspectForm({...prospectForm, entreprise: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={prospectForm.email}
                      onChange={(e) => setProspectForm({...prospectForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={prospectForm.telephone}
                      onChange={(e) => setProspectForm({...prospectForm, telephone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Créer
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewProspect(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Similar modals for Client, Artwork, Location... */}
        {/* Add other modals here following the same pattern */}
      </div>
    </div>
  );
};

export default AdminDashboard;
