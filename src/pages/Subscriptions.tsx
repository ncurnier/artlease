import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Subscription {
  id: string;
  nom: string;
  description: string;
  prix_base: number;
  services_inclus: string[];
  duree_minimum: number;
  popular?: boolean;
  premium?: boolean;
}

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('formules')
        .select('*')
        .order('prix_base', { ascending: true });

      if (error) throw error;

      // Add popular and premium flags
      const formattedData = data?.map((item, index) => ({
        ...item,
        popular: index === 1, // Second plan is popular
        premium: index === data.length - 1 // Last plan is premium
      })) || [];

      setSubscriptions(formattedData);
    } catch (error) {
      console.error('Erreur lors du chargement des formules:', error);
      
      // Fallback to mock data
      const mockSubscriptions: Subscription[] = [
        {
          id: '1',
          nom: 'Essentiel',
          description: 'Parfait pour découvrir l\'art de location',
          prix_base: 99,
          services_inclus: [
            'Jusqu\'à 2 œuvres simultanées',
            'Livraison standard',
            'Support par email',
            'Assurance de base'
          ],
          duree_minimum: 3,
          popular: false,
          premium: false
        },
        {
          id: '2',
          nom: 'Professionnel',
          description: 'Idéal pour les entreprises et collectionneurs',
          prix_base: 199,
          services_inclus: [
            'Jusqu\'à 5 œuvres simultanées',
            'Livraison express gratuite',
            'Support prioritaire',
            'Assurance premium',
            'Conseil personnalisé',
            'Rotation trimestrielle'
          ],
          duree_minimum: 6,
          popular: true,
          premium: false
        },
        {
          id: '3',
          nom: 'Premium',
          description: 'L\'expérience ultime pour les connaisseurs',
          prix_base: 399,
          services_inclus: [
            'Œuvres illimitées',
            'Livraison VIP',
            'Concierge dédié',
            'Assurance tous risques',
            'Accès aux œuvres exclusives',
            'Événements privés',
            'Installation professionnelle'
          ],
          duree_minimum: 12,
          popular: false,
          premium: true
        }
      ];
      
      setSubscriptions(mockSubscriptions);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would typically redirect to checkout or open a modal
    console.log('Plan sélectionné:', planId);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Formules d'Abonnement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez la formule qui correspond à vos besoins et découvrez l'art autrement
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subscriptions.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-amber-500 scale-105' : ''
              } ${plan.premium ? 'bg-gradient-to-br from-gray-900 to-black text-white' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Populaire
                  </div>
                </div>
              )}

              {plan.premium && (
                <div className="absolute top-4 right-4">
                  <Crown className="w-6 h-6 text-amber-400" />
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.premium ? 'text-white' : 'text-gray-900'}`}>
                    {plan.nom}
                  </h3>
                  <p className={`${plan.premium ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-4xl font-bold ${plan.premium ? 'text-white' : 'text-gray-900'}`}>
                      {plan.prix_base}€
                    </span>
                    <span className={`text-lg ${plan.premium ? 'text-gray-300' : 'text-gray-600'} ml-1`}>
                      /mois
                    </span>
                  </div>
                  <p className={`text-sm ${plan.premium ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                    Engagement minimum {plan.duree_minimum} mois
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.services_inclus.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-start">
                      <Check className={`w-5 h-5 ${plan.premium ? 'text-amber-400' : 'text-green-500'} mr-3 mt-0.5 flex-shrink-0`} />
                      <span className={`${plan.premium ? 'text-gray-300' : 'text-gray-700'}`}>
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.premium
                      ? 'bg-amber-500 text-black hover:bg-amber-400'
                      : plan.popular
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } ${selectedPlan === plan.id ? 'ring-2 ring-offset-2 ring-amber-500' : ''}`}
                >
                  {plan.premium && <Zap className="w-5 h-5 inline mr-2" />}
                  Choisir cette formule
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Questions Fréquentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Puis-je changer de formule ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre formule à tout moment. 
                Les changements prennent effet lors du prochain cycle de facturation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment fonctionne la livraison ?
              </h3>
              <p className="text-gray-600">
                Nos équipes s'occupent de la livraison et de l'installation. 
                Les délais varient selon votre formule (standard, express ou VIP).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Que se passe-t-il en cas de dommage ?
              </h3>
              <p className="text-gray-600">
                Toutes nos œuvres sont assurées. En cas de dommage accidentel, 
                notre assurance couvre les réparations ou le remplacement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Puis-je acheter une œuvre ?
              </h3>
              <p className="text-gray-600">
                Certaines œuvres sont disponibles à l'achat. Contactez notre équipe 
                pour connaître les conditions et tarifs préférentiels.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscriptions;