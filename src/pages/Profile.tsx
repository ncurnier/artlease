import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Package, Settings, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  entreprise?: string;
  role: string;
  created_at: string;
}

interface Location {
  id: string;
  artwork_title: string;
  date_debut: string;
  date_fin: string;
  prix_mensuel: number;
  statut: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    adresse: '',
    entreprise: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchLocations();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        nom: data.nom || '',
        telephone: data.telephone || '',
        adresse: data.adresse || '',
        entreprise: data.entreprise || ''
      });
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      
      // Mock data for demo
      const mockProfile: UserProfile = {
        id: user?.id || '1',
        nom: 'Jean Dupont',
        email: user?.email || 'jean.dupont@example.com',
        telephone: '+33 1 23 45 67 89',
        adresse: '123 Rue de la Paix, 75001 Paris',
        entreprise: 'Art & Design SARL',
        role: 'client',
        created_at: '2024-01-15T10:00:00Z'
      };
      
      setProfile(mockProfile);
      setFormData({
        nom: mockProfile.nom,
        telephone: mockProfile.telephone || '',
        adresse: mockProfile.adresse || '',
        entreprise: mockProfile.entreprise || ''
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      // Mock data for demo - replace with real query when locations are properly set up
      const mockLocations: Location[] = [
        {
          id: '1',
          artwork_title: 'Abstraction Moderne #3',
          date_debut: '2024-01-15',
          date_fin: '2024-04-15',
          prix_mensuel: 150,
          statut: 'En cours'
        },
        {
          id: '2',
          artwork_title: 'Portrait Urbain',
          date_debut: '2023-10-01',
          date_fin: '2024-01-01',
          prix_mensuel: 200,
          statut: 'Terminée'
        }
      ];
      
      setLocations(mockLocations);
    } catch (error) {
      console.error('Erreur lors du chargement des locations:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      // For demo, just update local state
      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-green-100 text-green-800';
      case 'Terminée':
        return 'bg-gray-100 text-gray-800';
      case 'Annulée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mr-6">
              <User className="w-10 h-10 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile?.nom}
              </h1>
              <p className="text-gray-600">{profile?.email}</p>
              <p className="text-sm text-gray-500 capitalize">
                Membre depuis {new Date(profile?.created_at || '').toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'profile', label: 'Profil', icon: User },
                { id: 'locations', label: 'Mes Locations', icon: Package },
                { id: 'billing', label: 'Facturation', icon: CreditCard },
                { id: 'settings', label: 'Paramètres', icon: Settings }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Informations Personnelles
                  </h2>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    {isEditing ? 'Sauvegarder' : 'Modifier'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span>{profile?.nom}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      <span>{profile?.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-2" />
                        <span>{profile?.telephone || 'Non renseigné'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.entreprise}
                        onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center">
                        <span>{profile?.entreprise || 'Non renseigné'}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.adresse}
                        onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                        <span>{profile?.adresse || 'Non renseigné'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Locations Tab */}
            {activeTab === 'locations' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  Mes Locations
                </h2>

                <div className="space-y-4">
                  {locations.map(location => (
                    <div key={location.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {location.artwork_title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(location.statut)}`}>
                          {location.statut}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Du {new Date(location.date_debut).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Au {new Date(location.date_fin).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          {location.prix_mensuel}€/mois
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {locations.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Aucune location
                    </h3>
                    <p className="text-gray-600">
                      Vous n'avez pas encore loué d'œuvres d'art
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  Facturation
                </h2>
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucune facture
                  </h3>
                  <p className="text-gray-600">
                    Vos factures apparaîtront ici une fois que vous aurez effectué des locations
                  </p>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  Paramètres
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">Notifications par email</h3>
                        <p className="text-sm text-gray-600">Recevoir des notifications sur les nouvelles œuvres</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;