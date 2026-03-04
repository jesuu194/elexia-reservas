import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../../api/client';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const limit = 10;

  const loadProducts = async (currentPage = page) => {
    setLoading(true);
    setError('');
    try {
      const response = await productsApi.list(currentPage, limit);
      setProducts(response.products || []);
      setTotal(response.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const onDelete = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    try {
      await productsApi.remove(id);
      loadProducts(page);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card shadow-sm border-0 app-panel">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Productos</h2>
          <Link className="btn btn-success" to="/productos/nuevo">Nuevo</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div className="alert alert-info">Cargando...</div>}

        {!loading && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.nombre}</td>
                    <td>{product.descripcion}</td>
                    <td>{product.precio}</td>
                    <td>{product.stock}</td>
                    <td>{product.disponible ? 'Si' : 'No'}</td>
                    <td className="d-flex gap-2">
                      <Link className="btn btn-sm btn-info" to={`/productos/${product._id}`}>Ver</Link>
                      <Link className="btn btn-sm btn-warning" to={`/productos/${product._id}/editar`}>Editar</Link>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(product._id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-primary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Anterior</button>
          <span className="align-self-center">Pagina {page}</span>
          <button className="btn btn-outline-primary" disabled={page * limit >= total} onClick={() => setPage((p) => p + 1)}>Siguiente</button>
        </div>
      </div>
    </section>
  );
}
