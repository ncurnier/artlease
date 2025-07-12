import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Search,
  BookOpen,
  HelpCircle
} from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Support: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Comment fonctionne la location d'œuvres d'art ?",
      answer: "La location d'œuvres d'art avec ArtLease Pro est simple : choisissez vos œuvres, sélectionnez la durée de location (minimum 3 mois), et nous nous occupons de la livraison et de l'installation. Vous payez mensuellement et pouvez renouveler ou changer d'œuvres à tout moment.",
      category: "location"
    },
    {
      id: 2,
      question: "Que se passe-t-il en cas de dommage à une œuvre ?",
      answer: "Toutes nos œuvres sont couvertes par une assurance tous risques. En cas de dommage accidentel, contactez-nous immédiatement. Notre assurance couvre les réparations ou le remplacement sans frais supplémentaires pour vous.",
      category: "assurance"
    },
    {
      id: 3,
      question: "Puis-je acheter une œuvre que je loue ?",
      answer: "Oui, la plupart de nos œuvres sont disponibles à l'achat. Contactez notre équipe pour connaître le prix d'achat et bénéficier d'une réduction basée sur la durée de votre location.",
      category: "achat"
    },
    {
      id: 4,
      question: "Comment modifier ou annuler ma location ?",
      answer: "Vous pouvez modifier votre location depuis votre espace client ou en nous contactant. Pour les annulations, un préavis de 30 jours est requis. Les frais d'annulation varient selon la durée restante de votre contrat.",
      category: "gestion"
    },
    {
      id: 5,
      question: "Livrez-vous partout en France ?",
      answer: "Nous livrons dans toute la France métropolitaine. La livraison et l'installation sont incluses dans nos tarifs. Pour les DOM-TOM et l'international, contactez-nous pour un devis personnalisé.",
      category: "livraison"
    },
    {
      id: 6,
      question: "Comment choisir la bonne œuvre pour mon espace ?",
      answer: "Notre équipe de conseillers peut vous aider à choisir les œuvres parfaites pour votre espace. Nous proposons des consultations virtuelles ou à domicile pour vous accompagner dans votre sélection.",
      category: "conseil"
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'location', label: 'Location' },
    { id: 'assurance', label: 'Assurance' },
    { id: 'achat', label: 'Achat' },
    { id: 'gestion', label: 'Gestion' },
    { id: 'livraison', label: 'Livraison' },
    { id: 'conseil', label: 'Conseil' }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
    alert('Votre message a été envoyé avec succès !');
  };

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
            Centre d'aide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions ou contactez notre équipe d'experts
          </p>
        </motion.div>

        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Téléphone
            </h3>
            <p className="text-gray-600 mb-4">
              Lun-Ven 9h-18h
            </p>
            <a
              href="tel:+33123456789"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              01 23 45 67 89
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chat en direct
            </h3>
            <p className="text-gray-600 mb-4">
              Réponse immédiate
            </p>
            <button className="text-green-600 hover:text-green-700 font-semibold">
              Démarrer le chat
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email
            </h3>
            <p className="text-gray-600 mb-4">
              Réponse sous 24h
            </p>
            <a
              href="mailto:support@artleasepro.com"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              support@artleasepro.com
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Questions fréquentes
                </h2>
              </div>

              {/* Search and Filter */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucune FAQ trouvée
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contactez-nous
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="low">Faible</option>
                    <option value="normal">Normale</option>
                    <option value="high">Élevée</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                  Envoyer le message
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Temps de réponse moyen: 2-4 heures
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
