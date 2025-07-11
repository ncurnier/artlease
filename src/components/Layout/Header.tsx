import React, { useState } from 'react';
import { Menu, X, Palette, LogIn, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin, loading } = useAuth();

  const menuItems = [
    { id: 'accueil', label: 'Accueil', public: true },
    { id: 'catalogue', label: 'Catalogue', public: true },
    { id: 'formules', label: 'Formules', public: true },
    { id: 'about', label: 'À propos', public: true },
    { id: 'contact', label: 'Contact', public: true },
    { id: 'client-space', label: 'Espace Client', public: false },
    { id: 'admin', label: 'Administration', public: false, adminOnly: true }
  ];

  const handleLogout = () => {
    logout();
    onPageChange('accueil');
  };

  if (loading) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-800">ArtLease Pro</span>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
          </div>
        </div>
      </header>
    );
  }
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
            {menuItems.map(item => {
              // Skip items that shouldn't be shown
              if (!item.public && !isAuthenticated) return null;
              if (item.adminOnly && !isAdmin) return null;
              
              return (
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
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{user?.nom}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onPageChange('login')}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Connexion</span>
              </button>
            )}
          </div>

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
              {menuItems.map(item => {
                if (!item.public && !isAuthenticated) return null;
                if (item.adminOnly && !isAdmin) return null;
                
                return (
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
                );
              })}
              
              {/* Mobile User Menu */}
              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700">
                      <User className="h-5 w-5" />
                      <span>{user?.nom}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onPageChange('login');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors w-full"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Connexion</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;