import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/products/Products';
import ProductForm from './pages/products/ProductForm';
import ProductDetail from './pages/products/ProductDetail';
import Reservas from './pages/reservas/Reservas';
import ReservaForm from './pages/reservas/ReservaForm';
import ReservaDetail from './pages/reservas/ReservaDetail';
import ChatbotElexia from './components/ChatbotElexia';
import Servicios from './pages/Servicios';
import CasosExito from './pages/CasosExito';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import SolicitaDemo from './pages/SolicitaDemo';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 app-bg">
      <Navbar />
      <main className="flex-fill py-4">
        <div className="container-fluid px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/casos" element={<CasosExito />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/demo" element={<SolicitaDemo />} />
            {/* Productos */}
            <Route path="/productos" element={<Products />} />
            <Route path="/productos/nuevo" element={<ProductForm />} />
            <Route path="/productos/:id/editar" element={<ProductForm edit />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            {/* Reservas */}
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/reservas/nueva" element={<ReservaForm />} />
            <Route path="/reservas/:id/editar" element={<ReservaForm edit />} />
            <Route path="/reservas/:id" element={<ReservaDetail />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <ChatbotElexia />
    </div>
  );
}

export default App;
