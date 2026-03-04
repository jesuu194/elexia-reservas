import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/products/ProductListPage';
import ProductFormPage from './pages/products/ProductFormPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import ReservaListPage from './pages/reservas/ReservaListPage';
import ReservaFormPage from './pages/reservas/ReservaFormPage';
import ReservaDetailPage from './pages/reservas/ReservaDetailPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductListPage />} />
        <Route path="/productos/nuevo" element={<ProductFormPage />} />
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/productos/:id/editar" element={<ProductFormPage />} />
        <Route path="/reservas" element={<ReservaListPage />} />
        <Route path="/reservas/nueva" element={<ReservaFormPage />} />
        <Route path="/reservas/:id" element={<ReservaDetailPage />} />
        <Route path="/reservas/:id/editar" element={<ReservaFormPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
