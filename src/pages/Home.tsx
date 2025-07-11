import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Palette, Shield, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Palette className="h-8 w-8 text-yellow-600" />,
      title: "Collection d'Exception",
      description: "Œuvres d'art soigneusement sélectionnées par nos experts pour valoriser votre environnement."
    },
    {
      icon: <Shield className="h-8 w-8 text-yellow-600" />,
      title: "Sérénité Garantie",
      description: "Assurance incluse, transport sécurisé et installation professionnelle par nos équipes."
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-600" />,
      title: "Service Premium",
      description: "Accompagnement personnalisé et support client disponible 7j/7 pour tous vos besoins."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-yellow-600" />,
      title: "Flexibilité Totale",
      description: "Rotation d'œuvres, durée flexible, paiements sécurisés. Adaptez-vous à vos envies."
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "Hôtel Le Grand Palace",
      text: "ArtLease Pro a transformé nos espaces. Nos clients adorent découvrir de nouvelles œuvres à chaque visite.",
      rating: 5
    },
    {
      name: "Jean Martin",
      company: "Cabinet d'Avocats Martin & Associés",
      text: "Un service exceptionnel et des œuvres magnifiques qui impressionnent nos clients.",
      rating: 5
    },
    {
      name: "Sophie Lemoine",
      company: "Espace de Coworking Innovation",
      text: "La rotation mensuelle maintient la créativité de nos équipes. Parfait pour notre environnement dynamique.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop&crop=center)'
          }}
        ></div>
        
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                L'Art au Service de 
                <span className="text-yellow-400"> Votre Excellence</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Découvrez notre plateforme premium de location d'œuvres d'art. 
                Transformez vos espaces avec des collections d'exception, 
                gérées par des experts passionnés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/gallery"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
                >
                  <span>Explorer la Galerie</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/subscriptions"
                  className="border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all"
                >
                  Découvrir nos Offres
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                    <div className="text-gray-300">Œuvres d'Art</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">200+</div>
                    <div className="text-gray-300">Clients Satisfaits</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                    <div className="text-gray-300">Artistes Partenaires</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
                    <div className="text-gray-300">Satisfaction Client</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pourquoi Choisir ArtLease Pro ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche unique et premium de la location d'art pour les entreprises et particuliers exigeants
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Ce que Disent nos Clients
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-yellow-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à Transformer Votre Espace ?
            </h2>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 200 entreprises qui font confiance à ArtLease Pro 
              pour valoriser leurs espaces avec l'art
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/gallery"
                className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center space-x-2"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Commencer Maintenant</span>
              </Link>
              <Link 
                to="/support"
                className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Parler à un Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-gray-300">Œuvres dans notre collection</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">200+</div>
              <div className="text-gray-300">Entreprises satisfaites</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Artistes partenaires</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-300">Taux de satisfaction client</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;