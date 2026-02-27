import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/products';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      setSuccess('Producto eliminado correctamente');
      fetchProducts();
    } catch (err) {
      setError('No se pudo eliminar el producto');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{color:'#2e7d5a',fontWeight:'bold'}}>Productos</h2>
      {loading && <div className="text-center my-4"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-3 text-end">
        <Link className="btn btn-primary" style={{borderRadius:24,background:'#2e7d5a',fontWeight:'bold'}} to="/productos/nuevo">Nuevo producto</Link>
      </div>
      <div className="card shadow-sm" style={{borderRadius:18}}>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead style={{background:'#f7f6f3'}}>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.precio.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
                  <td>{p.stock}</td>
                  <td>
                    <Link className="btn btn-sm btn-info me-1" style={{borderRadius:16,background:'#3bb78f',border:'none',color:'#fff'}} to={`/productos/${p._id}`}>Ver</Link>
                    <Link className="btn btn-sm btn-warning me-1" style={{borderRadius:16,background:'#ffe082',border:'none',color:'#222'}} to={`/productos/${p._id}/editar`}>Editar</Link>
                    <button className="btn btn-sm btn-danger" style={{borderRadius:16,background:'#e57373',border:'none'}} onClick={() => handleDelete(p._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
