import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 404 Illustration */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-9xl font-bold text-amber-600 opacity-20"
            >
              404
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-amber-600" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Page non trouvée
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
              Vérifiez l'URL ou retournez à l'accueil pour découvrir nos œuvres d'art.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Accueil
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">
              Liens utiles :
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/gallery')}
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                Galerie
              </button>
              <button
                onClick={() => navigate('/artists')}
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                Artistes
              </button>
              <button
                onClick={() => navigate('/subscriptions')}
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                Abonnements
              </button>
              <button
                onClick={() => navigate('/support')}
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                Support
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;