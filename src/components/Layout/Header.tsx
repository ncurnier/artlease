import React, { useState } from 'react';
import { Menu, X, Palette } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'formules', label: 'Formules' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
    { id: 'client-space', label: 'Espace Client' },
    { id: 'admin', label: 'Administration' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onPageChange('accueil')}
          >
            <Palette className="h-8 w-8 text-yellow-600" />
            <span className="text-2xl font-bold text-gray-800">ArtLease Pro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-left rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-yellow-600 text-white'
                      : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;