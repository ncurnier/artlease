import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useCreateProspect, useCreateNewsletterSubscriber } from '../hooks/useSupabaseData';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    telephone: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const { createProspect } = useCreateProspect();
  const { createSubscriber } = useCreateNewsletterSubscriber();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createProspect({
        nom: formData.nom,
        email: formData.email,
        entreprise: formData.entreprise,
        telephone: formData.telephone,
        source: 'Contact'
      });

      setSubmitSuccess(true);
      setFormData({
        nom: '',
        email: '',
        entreprise: '',
        telephone: '',
        message: ''
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);

    try {
      await createSubscriber({
        email: newsletterEmail,
        source: 'Contact'
      });

      setNewsletterSuccess(true);
      setNewsletterEmail('');

      setTimeout(() => setNewsletterSuccess(false), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription à la newsletter:', error);
      alert('Erreur lors de l\'inscription à la newsletter. Veuillez réessayer.');
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vous avez un projet ? Une question ? N'hésitez pas à nous contacter pour discuter de vos besoins en location d'œuvres d'art.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800">Message envoyé avec succès !</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="entreprise"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Décrivez votre projet, vos besoins..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations de contact
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@artlease.fr</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      123 Rue de l'Art<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Newsletter
              </h2>

              {newsletterSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800">Inscription réussie !</span>
                </div>
              )}

              <p className="text-gray-600 mb-4">
                Restez informé de nos dernières œuvres et actualités.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isNewsletterSubmitting ? 'Inscription...' : 'S\'inscrire'}
                </button>
              </form>
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Horaires d'ouverture
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>10h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
