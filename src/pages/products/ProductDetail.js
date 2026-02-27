import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .catch(() => setError('No se pudo cargar el producto'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center my-4"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div className="alert alert-warning">Producto no encontrado</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{product.nombre}</h3>
          <h6 className="card-subtitle mb-2 text-muted">ID: {product._id}</h6>
          <p className="card-text">{product.descripcion}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Precio:</b> {product.precio.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</li>
            <li className="list-group-item"><b>Stock:</b> {product.stock}</li>
          </ul>
          <Link className="btn btn-secondary mt-3" to="/productos">Volver</Link>
          <button className="btn btn-warning mt-3 ms-2" onClick={() => navigate(`/productos/${product._id}/editar`)}>Editar</button>
        </div>
      </div>
    </div>
  );
}
