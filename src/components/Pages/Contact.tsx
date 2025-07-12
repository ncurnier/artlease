import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, Building, MessageSquare } from 'lucide-react';
import { useCreateProspect, useCreateNewsletterSubscriber } from '../../hooks/useSupabaseData';

const Contact: React.FC = () => {
  const { createProspect, loading: createLoading } = useCreateProspect();
  const { createSubscriber } = useCreateNewsletterSubscriber();
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    newsletter: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Créer le prospect dans Supabase
      const prospectData = {
        nom: formData.nom,
        entreprise: formData.entreprise,
        email: formData.email,
        telephone: formData.telephone || null,
        statut: 'Nouveau',
        source: 'Contact'
      };
      
      await createProspect(prospectData);

      // Si l'utilisateur souhaite s'abonner à la newsletter
      if (formData.newsletter) {
        try {
          await createSubscriber({
            email: formData.email,
            nom: formData.nom,
            entreprise: formData.entreprise,
            source: 'Contact'
          });
        } catch (newsletterError) {
          console.warn('Erreur lors de l\'inscription à la newsletter:', newsletterError);
        }
      }

      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nom: '',
          entreprise: '',
          email: '',
          telephone: '',
          sujet: '',
          message: '',
          newsletter: false
        });
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert(`Erreur lors de l'envoi du formulaire: ${error.message || 'Veuillez réessayer.'}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-gray-600">
            Nous sommes à votre disposition pour étudier votre projet
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Demander un Devis
            </h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Envoyé !</h3>
                <p className="text-gray-600">
                  Nous vous recontacterons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="entreprise"
                        name="entreprise"
                        value={formData.entreprise}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="01 23 45 67 89"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="info">Demande d'information</option>
                    <option value="rdv">Prise de rendez-vous</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Décrivez votre projet, vos besoins, le type d'espace..."
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                    Je souhaite recevoir la newsletter ArtLease Pro
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={createLoading}
                  className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                  <span>{createLoading ? 'Envoi en cours...' : 'Envoyer le Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Nos Coordonnées
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Téléphone</p>
                    <p className="text-gray-600">01 42 33 44 55</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">contact@artlease.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Adresse</p>
                    <p className="text-gray-600">123 Rue de Rivoli<br />75001 Paris</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Horaires d'Ouverture
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lundi - Vendredi</span>
                  <span className="text-gray-800 font-medium">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Samedi</span>
                  <span className="text-gray-800 font-medium">9h00 - 12h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimanche</span>
                  <span className="text-gray-800 font-medium">Fermé</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-yellow-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Besoin d'aide ?
              </h3>
              <p className="text-gray-600 mb-4">
                Notre équipe est à votre disposition pour répondre à toutes vos questions.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  📞 <strong>Urgence :</strong> 06 12 34 56 78
                </p>
                <p className="text-sm text-gray-600">
                  📧 <strong>Devis rapide :</strong> devis@artlease.com
                </p>
                <p className="text-sm text-gray-600">
                  💬 <strong>Support :</strong> support@artlease.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
