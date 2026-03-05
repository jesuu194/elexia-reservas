import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productsApi } from '../../api/client';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const cleanLabel = (value = '') => String(value).replace(/\bIA\b/g, '').replace(/\s{2,}/g, ' ').trim();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productsApi.byId(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div className="alert alert-info">Cargando...</div>;

  return (
    <section className="card shadow-sm border-0 app-panel">
      <div className="card-body">
        <h2 className="h4">{cleanLabel(product.nombre)}</h2>
        <p>{cleanLabel(product.descripcion)}</p>
        <ul className="list-group mb-3">
          <li className="list-group-item"><strong>Precio:</strong> {product.precio}</li>
          <li className="list-group-item"><strong>Stock:</strong> {product.stock}</li>
          <li className="list-group-item"><strong>Disponible:</strong> {product.disponible ? 'Si' : 'No'}</li>
          <li className="list-group-item"><strong>Fecha:</strong> {new Date(product.fechaPublicacion).toLocaleDateString()}</li>
        </ul>
        <Link className="btn btn-secondary" to="/productos">Volver</Link>
      </div>
    </section>
  );
}
