import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Settings,
  Mail,
  BarChart3,
  FileText,
  Shield
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      title: 'Revenus du mois',
      value: '€12,450',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Locations actives',
      value: '47',
      change: '+8%',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Nouveaux clients',
      value: '23',
      change: '+15%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Œuvres disponibles',
      value: '156',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-amber-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'location',
      message: 'Nouvelle location par Marie Dubois',
      time: 'Il y a 2 heures',
      status: 'success'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Paiement reçu de Jean Martin',
      time: 'Il y a 4 heures',
      status: 'success'
    },
    {
      id: 3,
      type: 'artwork',
      message: 'Nouvelle œuvre ajoutée par Sophie Chen',
      time: 'Il y a 6 heures',
      status: 'info'
    },
    {
      id: 4,
      type: 'user',
      message: 'Nouveau compte créé',
      time: 'Il y a 1 jour',
      status: 'info'
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'artworks', label: 'Œuvres', icon: Package },
    { id: 'locations', label: 'Locations', icon: Calendar },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'reports', label: 'Rapports', icon: FileText },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <Shield className="w-8 h-8 text-amber-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-100 text-amber-700 border-r-2 border-amber-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Tableau de bord
                </h2>
                <p className="text-gray-600">
                  Vue d'ensemble de votre plateforme ArtLease Pro
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gray-100`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {stat.title}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Charts and Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Placeholder */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Revenus mensuels
                  </h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Graphique des revenus</p>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Activités récentes
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || Settings, {
                    className: "w-8 h-8 text-gray-400"
                  })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Section en développement
                </h3>
                <p className="text-gray-600">
                  Cette fonctionnalité sera bientôt disponible.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;