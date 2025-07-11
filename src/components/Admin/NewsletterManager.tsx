import React, { useState } from 'react';
import { Mail, Users, Send, Plus, Edit, Trash2, Eye, Calendar, BarChart3 } from 'lucide-react';
import { useNewsletterData } from '../../hooks/useSupabaseData';

const NewsletterManager: React.FC = () => {
  const { subscribers, campaigns, loading, createCampaign, createSubscriber, updateSubscriber, deleteSubscriber } = useNewsletterData();
  const [activeTab, setActiveTab] = useState('subscribers');
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [showNewSubscriber, setShowNewSubscriber] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<any>(null);

  const [campaignForm, setCampaignForm] = useState({
    titre: '',
    sujet: '',
    contenu: ''
  });

  const [subscriberForm, setSubscriberForm] = useState({
    email: '',
    nom: '',
    entreprise: ''
  });

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCampaign(campaignForm);
      setCampaignForm({ titre: '', sujet: '', contenu: '' });
      setShowNewCampaign(false);
    } catch (error) {
      console.error('Erreur lors de la création de la campagne:', error);
      alert('Erreur lors de la création de la campagne');
    }
  };

  const handleCreateSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubscriber({
        ...subscriberForm,
        source: 'Manuel'
      });
      setSubscriberForm({ email: '', nom: '', entreprise: '' });
      setShowNewSubscriber(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'abonné:', error);
      alert('Erreur lors de l\'ajout de l\'abonné');
    }
  };

  const handleUpdateSubscriber = async (id: string, updates: any) => {
    try {
      await updateSubscriber(id, updates);
      setEditingSubscriber(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) {
      try {
        await deleteSubscriber(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'Inactif': return 'bg-gray-100 text-gray-800';
      case 'Désabonné': return 'bg-red-100 text-red-800';
      case 'Brouillon': return 'bg-gray-100 text-gray-800';
      case 'Programmé': return 'bg-yellow-100 text-yellow-800';
      case 'Envoyé': return 'bg-green-100 text-green-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Abonnés Actifs</h3>
          <p className="text-3xl font-bold text-blue-600">
            {subscribers.filter(s => s.statut === 'Actif').length}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Campagnes Envoyées</h3>
          <p className="text-3xl font-bold text-green-600">
            {campaigns.filter(c => c.statut === 'Envoyé').length}
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Taux d'Ouverture</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {campaigns.length > 0 
              ? Math.round((campaigns.reduce((sum, c) => sum + (c.nombre_ouvertures || 0), 0) / 
                  Math.max(campaigns.reduce((sum, c) => sum + (c.nombre_destinataires || 0), 0), 1)) * 100)
              : 0}%
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Nouveaux ce mois</h3>
          <p className="text-3xl font-bold text-purple-600">
            {subscribers.filter(s => {
              const date = new Date(s.created_at);
              const now = new Date();
              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'subscribers'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Abonnés ({subscribers.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'campaigns'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Campagnes ({campaigns.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'analytics'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Statistiques</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Gestion des Abonnés</h3>
            <button
              onClick={() => setShowNewSubscriber(true)}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Nouvel Abonné</span>
            </button>
          </div>

          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abonné
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entreprise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'inscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{subscriber.nom || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{subscriber.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscriber.entreprise || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={subscriber.statut}
                          onChange={(e) => handleUpdateSubscriber(subscriber.id, { statut: e.target.value })}
                          className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(subscriber.statut)}`}
                        >
                          <option value="Actif">Actif</option>
                          <option value="Inactif">Inactif</option>
                          <option value="Désabonné">Désabonné</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscriber.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(subscriber.date_inscription || subscriber.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setEditingSubscriber(subscriber)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
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

      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Campagnes Newsletter</h3>
            <button
              onClick={() => setShowNewCampaign(true)}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Nouvelle Campagne</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{campaign.titre}</h4>
                    <p className="text-gray-600 mb-2">{campaign.sujet}</p>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{campaign.contenu}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📧 {campaign.nombre_destinataires || 0} destinataires</span>
                      <span>👁️ {campaign.nombre_ouvertures || 0} ouvertures</span>
                      <span>🖱️ {campaign.nombre_clics || 0} clics</span>
                      {campaign.date_envoi && (
                        <span>📅 {new Date(campaign.date_envoi).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(campaign.statut)}`}>
                      {campaign.statut}
                    </span>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    {campaign.statut === 'Brouillon' && (
                      <button className="text-green-600 hover:text-green-900">
                        <Send className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Statistiques Newsletter</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Évolution des abonnés</h4>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Graphique d'évolution des abonnés</p>
                <p className="text-sm">Fonctionnalité à implémenter</p>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Performance des campagnes</h4>
              <div className="text-center py-8 text-gray-500">
                <Mail className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Statistiques des campagnes</p>
                <p className="text-sm">Fonctionnalité à implémenter</p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Résumé des Performances</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{subscribers.length}</p>
                <p className="text-sm text-gray-600">Total Abonnés</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{campaigns.length}</p>
                <p className="text-sm text-gray-600">Campagnes Créées</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {campaigns.reduce((sum, c) => sum + (c.nombre_ouvertures || 0), 0)}
                </p>
                <p className="text-sm text-gray-600">Total Ouvertures</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouvelle Campagne */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Nouvelle Campagne Newsletter</h3>
                <button
                  onClick={() => setShowNewCampaign(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la campagne</label>
                  <input
                    type="text"
                    value={campaignForm.titre}
                    onChange={(e) => setCampaignForm({...campaignForm, titre: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet de l'email</label>
                  <input
                    type="text"
                    value={campaignForm.sujet}
                    onChange={(e) => setCampaignForm({...campaignForm, sujet: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                  <textarea
                    value={campaignForm.contenu}
                    onChange={(e) => setCampaignForm({...campaignForm, contenu: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Créer en Brouillon
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewCampaign(false)}
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

      {/* Modal Nouvel Abonné */}
      {showNewSubscriber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Nouvel Abonné</h3>
                <button
                  onClick={() => setShowNewSubscriber(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateSubscriber} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={subscriberForm.email}
                    onChange={(e) => setSubscriberForm({...subscriberForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={subscriberForm.nom}
                    onChange={(e) => setSubscriberForm({...subscriberForm, nom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                  <input
                    type="text"
                    value={subscriberForm.entreprise}
                    onChange={(e) => setSubscriberForm({...subscriberForm, entreprise: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewSubscriber(false)}
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
    </div>
  );
};

export default NewsletterManager;