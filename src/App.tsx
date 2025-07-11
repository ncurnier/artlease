import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home.tsx';
import Artists from './pages/Artists.tsx';
import ArtworkDetail from './pages/ArtworkDetail.tsx';
import Checkout from './pages/Checkout.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import { ProtectedRoute } from './components/Auth/ProtectedRoute.tsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oeuvres" element={<Artists />} />
        <Route path="/oeuvre/:id" element={<ArtworkDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées pour admin */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  );
}

export default App;
