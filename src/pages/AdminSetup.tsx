import React, { useState } from 'react';
import { ensureAdminExists, populateArtworksData } from '../utils/adminSetup';

const AdminSetup: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSetupAdmin = async () => {
    setLoading(true);
    setStatus('Configuration de l\'administrateur...');
    
    try {
      const adminResult = await ensureAdminExists();
      if (adminResult.success) {
        if (adminResult.exists) {
          setStatus('Administrateur déjà configuré. Email: nicolascurnier@gmail.com');
        } else {
          setStatus('Administrateur créé avec succès! Email: nicolascurnier@gmail.com, Mot de passe: ArtLease2025!');
        }
      } else {
        setStatus(`Erreur lors de la configuration de l'administrateur: ${adminResult.error}`);
      }
    } catch (error) {
      setStatus(`Erreur: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePopulateArtworks = async () => {
    setLoading(true);
    setStatus('Ajout des œuvres d\'art...');
    
    try {
      const artworksResult = await populateArtworksData();
      if (artworksResult.success) {
        if (artworksResult.exists) {
          setStatus('Les œuvres d\'art sont déjà présentes dans la base de données.');
        } else {
          setStatus('10 œuvres d\'art classiques ajoutées avec succès!');
        }
      } else {
        setStatus(`Erreur lors de l'ajout des œuvres: ${artworksResult.error}`);
      }
    } catch (error) {
      setStatus(`Erreur: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFullSetup = async () => {
    setLoading(true);
    setStatus('Configuration complète en cours...');
    
    try {
      const adminResult = await ensureAdminExists();
      const artworksResult = await populateArtworksData();
      
      let message = 'Configuration terminée:\n';
      
      if (adminResult.success) {
        if (adminResult.exists) {
          message += '✅ Administrateur déjà configuré\n';
        } else {
          message += '✅ Administrateur créé (nicolascurnier@gmail.com / ArtLease2025!)\n';
        }
      } else {
        message += `❌ Erreur admin: ${adminResult.error}\n`;
      }
      
      if (artworksResult.success) {
        if (artworksResult.exists) {
          message += '✅ Œuvres d\'art déjà présentes\n';
        } else {
          message += '✅ 10 œuvres d\'art ajoutées\n';
        }
      } else {
        message += `❌ Erreur œuvres: ${artworksResult.error}\n`;
      }
      
      setStatus(message);
    } catch (error) {
      setStatus(`Erreur générale: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Configuration ArtLease Pro
          </h1>
          
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Utilisez cette page pour configurer l'application avec les données initiales.
              </p>
            </div>
            
            <div className="grid gap-4">
              <button
                onClick={handleSetupAdmin}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Configuration...' : 'Configurer Administrateur'}
              </button>
              
              <button
                onClick={handlePopulateArtworks}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Ajout...' : 'Ajouter Œuvres d\'Art'}
              </button>
              
              <button
                onClick={handleFullSetup}
                disabled={loading}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Configuration...' : 'Configuration Complète'}
              </button>
            </div>
            
            {status && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Statut:</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">{status}</pre>
              </div>
            )}
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Informations:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Email admin: nicolascurnier@gmail.com</li>
                <li>• Mot de passe admin: ArtLease2025!</li>
                <li>• 10 œuvres d'art classiques seront ajoutées</li>
                <li>• Accès admin: /admin après connexion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
