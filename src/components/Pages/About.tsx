import React from 'react';
import { Heart, Target, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Passion pour l'Art",
      description: "Nous sélectionnons chaque œuvre avec soin pour vous offrir le meilleur de l'art classique."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Excellence du Service",
      description: "Un service sur-mesure avec des experts dédiés à la réussite de votre projet artistique."
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Engagement RSE",
      description: "Nous croyons que l'art améliore la qualité de vie au travail et l'image de votre entreprise."
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Expertise Reconnue",
      description: "Une équipe d'experts en art et en décoration pour vous accompagner dans vos choix."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            À Propos d'ArtLease Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pionnier de la location d'œuvres d'art classique pour les entreprises, 
            nous transformons vos espaces professionnels en lieux d'inspiration et de bien-être.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
            <p className="text-gray-600 mb-4">
              ArtLease Pro est né d'une conviction : l'art a le pouvoir de transformer les environnements 
              professionnels et d'améliorer la qualité de vie au travail.
            </p>
            <p className="text-gray-600 mb-4">
              Nous proposons aux entreprises une solution unique de location d'œuvres d'art classique, 
              sans les contraintes juridiques et fiscales de l'achat, avec tous les services inclus 
              pour une expérience sans souci.
            </p>
            <p className="text-gray-600">
              Notre approche s'inscrit dans une démarche RSE, permettant aux entreprises de valoriser 
              leur image tout en offrant un cadre de travail inspirant à leurs collaborateurs.
            </p>
          </div>
          
          <div>
            <img 
              src="https://images.pexels.com/photos/1070547/pexels-photo-1070547.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Galerie d'art" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nos Valeurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RSE Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Notre Engagement RSE
            </h2>
            <p className="text-gray-700 mb-6">
              L'art au service de la Responsabilité Sociétale des Entreprises
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-3">🌱 Bien-être au Travail</h3>
                <p className="text-gray-600">
                  L'art améliore l'environnement de travail et contribue à la qualité de vie des collaborateurs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-3">🎨 Culture et Éducation</h3>
                <p className="text-gray-600">
                  Nous démocratisons l'accès à l'art et sensibilisons aux œuvres du patrimoine culturel.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-3">🤝 Partenariats Locaux</h3>
                <p className="text-gray-600">
                  Nous travaillons avec des artisans locaux pour l'encadrement et la restauration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Notre Équipe
          </h2>
          <p className="text-gray-600 mb-8">
            Une équipe d'experts passionnés à votre service
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-800 mb-2">Marie Dubois</h3>
              <p className="text-yellow-600 mb-2">Directrice Artistique</p>
              <p className="text-gray-600 text-sm">
                Historienne de l'art, spécialiste de la Renaissance et du classicisme français.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-800 mb-2">Jean-Pierre Martin</h3>
              <p className="text-yellow-600 mb-2">Responsable Logistique</p>
              <p className="text-gray-600 text-sm">
                Expert en transport d'œuvres d'art et installation muséale.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-800 mb-2">Sophie Lemoine</h3>
              <p className="text-yellow-600 mb-2">Conseillère Clients</p>
              <p className="text-gray-600 text-sm">
                Spécialiste en aménagement d'espaces et décoration d'entreprise.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            ArtLease Pro en Chiffres
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">2019</div>
              <div>Année de création</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div>Œuvres dans notre collection</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">200+</div>
              <div>Entreprises clientes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div>Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;