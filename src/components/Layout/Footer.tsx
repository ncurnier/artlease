import React from 'react';
import { Palette, Mail, Phone, MapPin } from 'lucide-react';
import { useCreateNewsletterSubscriber } from '../../hooks/useSupabaseData';

const Footer: React.FC = () => {
  const { createSubscriber, loading } = useCreateNewsletterSubscriber();
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await createSubscriber({ email, source: 'Site web' });
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription à la newsletter:', error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold">ArtLease Pro</span>
            </div>
            <p className="text-gray-300 mb-4">
              Spécialiste de la location d'œuvres d'art classique pour les entreprises. 
              Valorisez votre environnement professionnel avec nos collections d'exception.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              {isSubscribed ? (
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  ✓ Inscription réussie !
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="flex-1 px-3 py-2 text-gray-900 rounded-lg"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? '...' : 'S\'abonner'}
                  </button>
                </form>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-6 py-2 rounded-lg transition-colors">
                Catalogue
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nos Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Location d'œuvres d'art</li>
              <li>Accrochage professionnel</li>
              <li>Mise en scène</li>
              <li>Rotation d'œuvres</li>
              <li>Conseil artistique</li>
              <li>Assurance incluse</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@artlease.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>01 42 33 44 55</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Rue de Rivoli, 75001 Paris</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ArtLease Pro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;