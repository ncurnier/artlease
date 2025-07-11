import React from 'react';
import { ArrowRight, CheckCircle, Users, Palette, Shield } from 'lucide-react';

interface HomeProps {
  onPageChange: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onPageChange }) => {
  const features = [
    {
      icon: <Palette className="h-8 w-8 text-yellow-600" />,
      title: "Collection d'Exception",
      description: "Œuvres d'art classique soigneusement sélectionnées pour valoriser votre environnement professionnel."
    },
    {
      icon: <Shield className="h-8 w-8 text-yellow-600" />,
      title: "Sérénité Garantie",
      description: "Assurance incluse, transport sécurisé et installation professionnelle par nos experts."
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-600" />,
      title: "Démarche RSE",
      description: "Améliorez la qualité de vie au travail et l'image de votre entreprise avec l'art."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-yellow-600" />,
      title: "Flexibilité Totale",
      description: "Rotation d'œuvres, durée flexible, sans engagement d'achat. Adaptez-vous à vos besoins."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                L'Art au Service de 
                <span className="text-yellow-600"> Votre Entreprise</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Découvrez notre service de location d'œuvres d'art classique conçu spécialement pour les entreprises. 
                Valorisez vos espaces professionnels avec des collections d'exception.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onPageChange('catalogue')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Découvrir le Catalogue</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => onPageChange('contact')}
                  className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Demander un Devis
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&crop=center" 
                alt="Œuvre d'art classique" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-semibold">Dès 150€/mois</p>
                <p className="text-sm">Installation incluse</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pourquoi Choisir ArtLease Pro ?
            </h2>
            <p className="text-xl text-gray-600">
              Une approche unique de la location d'art pour les entreprises modernes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Transformer Votre Espace ?
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Contactez-nous pour une consultation gratuite et découvrez comment l'art peut valoriser votre entreprise
          </p>
          <button 
            onClick={() => onPageChange('contact')}
            className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Demander une Consultation
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">500+</div>
              <div className="text-gray-600">Œuvres dans notre collection</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">200+</div>
              <div className="text-gray-600">Entreprises satisfaites</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">95%</div>
              <div className="text-gray-600">Taux de satisfaction client</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;