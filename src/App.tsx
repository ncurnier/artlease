import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home.tsx';
import Artists from './pages/Artists.tsx';
import Gallery from './pages/Gallery.tsx';
import ArtworkDetail from './pages/ArtworkDetail.tsx';
import Checkout from './pages/Checkout.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import AdminSetup from './pages/AdminSetup.tsx';
import Contact from './pages/Contact.tsx';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oeuvres" element={<Gallery />} />
          <Route path="/artistes" element={<Artists />} />
          <Route path="/oeuvre/:id" element={<ArtworkDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Admin only */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route path="/setup" element={<AdminSetup />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;
