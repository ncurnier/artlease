import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Pages/Home';
import Catalogue from './components/Pages/Catalogue';
import Formules from './components/Pages/Formules';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import ClientSpace from './components/Pages/ClientSpace';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <Home onPageChange={setCurrentPage} />;
      case 'catalogue':
        return <Catalogue onPageChange={setCurrentPage} />;
      case 'formules':
        return <Formules onPageChange={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'client-space':
        return <ClientSpace onPageChange={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard onPageChange={setCurrentPage} />;
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;