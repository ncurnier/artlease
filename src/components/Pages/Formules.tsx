import React from 'react';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import { useFormules } from '../../hooks/useSupabaseData';

interface FormulesProps {
  onPageChange: (page: string) => void;
}

const Formules: React.FC<FormulesProps> = ({ onPageChange }) => {
  const { formules, loading, error } = useFormules();

  const getFormuleIcon = (index: number) => {
    switch (index) {
      case 0: return <Star className="h-8 w-8 text-blue-600" />;
      case 1: return <Crown className="h-8 w-8 text-yellow-600" />;
      case 2: return <Sparkles className="h-8 w-8 text-purple-600" />;
      default: return <Star className="h-8 w-8 text-blue-600" />;
    }
  };

  const getFormuleColor = (index: number) => {
    switch (index) {
      case 0: return 'border-blue-200 hover:border-blue-300';
      case 1: return 'border-yellow-200 hover:border-yellow-300 ring-2 ring-yellow-200';
      case 2: return 'border-purple-200 hover:border-purple-300';
      default: return 'border-blue-200 hover:border-blue-300';
    }
  };

  const getButtonColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-blue-600 hover:bg-blue-700';
      case 1: return 'bg-yellow-600 hover:bg-yellow-700';
      case 2: return 'bg-purple-600 hover:bg-purple-700';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des formules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des formules</p>
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
            Nos Formules de Location
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez la formule qui correspond le mieux à vos besoins
          </p>
        </div>

        {/* Formules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {formules.map((formule, index) => (
            <div key={formule.id} className={`bg-white rounded-lg shadow-lg border-2 ${getFormuleColor(index)} transition-all duration-300 hover:shadow-xl`}>
              {/* Popular Badge */}
              {index === 1 && (
                <div className="bg-yellow-600 text-white text-center py-2 rounded-t-lg">
                  <span className="font-semibold">🔥 PLUS POPULAIRE</span>
                </div>
              )}

              <div className="p-8">
                {/* Icon and Name */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {getFormuleIcon(index)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {formule.nom}
                  </h3>
                  <p className="text-gray-600">
                    {formule.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {formule.prix_base}€
                    <span className="text-lg font-normal text-gray-600">/mois</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Durée minimum: {formule.duree_minimum} mois
                  </p>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4">Services inclus:</h4>
                  <ul className="space-y-2">
                    {formule.services_inclus.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onPageChange('contact')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${getButtonColor(index)}`}
                >
                  Choisir cette formule
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Services Details */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Détails de nos Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">🚛 Transport</h3>
              <p className="text-gray-600">
                Livraison et récupération des œuvres dans toute la France métropolitaine avec emballage sécurisé.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">🛡️ Assurance</h3>
              <p className="text-gray-600">
                Couverture complète contre les dommages, vol et catastrophes naturelles durant toute la période de location.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">🖼️ Accrochage</h3>
              <p className="text-gray-600">
                Installation professionnelle par nos équipes spécialisées selon les normes muséales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">🎨 Mise en scène</h3>
              <p className="text-gray-600">
                Conseil d'expert pour l'aménagement et la mise en valeur optimale de vos espaces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">🔄 Rotation</h3>
              <p className="text-gray-600">
                Renouvellement régulier de vos œuvres pour maintenir l'intérêt et la fraîcheur de votre collection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">💡 Conseil artistique</h3>
              <p className="text-gray-600">
                Accompagnement personnalisé pour le choix des œuvres selon votre secteur d'activité et vos valeurs.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Questions Fréquentes
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Quelle est la durée minimum de location ?
              </h3>
              <p className="text-gray-600">
                La durée minimum varie selon la formule choisie : 3 mois pour la formule Essentielle, 
                6 mois pour la formule Confort et 12 mois pour la formule Premium.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Les prix sont-ils fixes ou négociables ?
              </h3>
              <p className="text-gray-600">
                Nos prix sont basés sur la valeur des œuvres et incluent tous les services. 
                Des remises sont possibles pour les contrats long terme ou les gros volumes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Que se passe-t-il en cas de dommage ?
              </h3>
              <p className="text-gray-600">
                Toutes nos œuvres sont intégralement assurées. En cas de dommage, 
                notre assurance prend en charge la restauration ou le remplacement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Puis-je modifier ma formule en cours de contrat ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez faire évoluer votre formule à tout moment. 
                Contactez-nous pour étudier les modalités de changement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formules;