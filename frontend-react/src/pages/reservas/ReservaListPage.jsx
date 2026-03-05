import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reservasApi } from '../../api/client';

export default function ReservaListPage() {
  const [reservas, setReservas] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const limit = 10;

  const loadReservas = async (currentPage = page, currentEstado = estado) => {
    setLoading(true);
    setError('');
    try {
      const response = await reservasApi.list(currentPage, limit, currentEstado);
      setReservas(response.reservas || []);
      setTotal(response.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservas(page, estado);
  }, [page, estado]);

  const onDelete = async (id) => {
    if (!window.confirm('¿Eliminar reserva?')) return;
    try {
      await reservasApi.remove(id);
      loadReservas(page, estado);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card shadow-sm border-0 app-panel">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Reservas</h2>
          <Link className="btn btn-success" to="/reservas/nueva">Nueva</Link>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Filtrar por estado</label>
            <select className="form-select" value={estado} onChange={(e) => { setEstado(e.target.value); setPage(1); }}>
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div className="alert alert-info">Cargando...</div>}

        {!loading && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                  <th>Asistencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva._id}>
                    <td>{reserva.cliente}</td>
                    <td>{String(reserva.producto || '').replace(/\bIA\b/g, '').replace(/\s{2,}/g, ' ').trim()}</td>
                    <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                    <td>{reserva.cantidad}</td>
                    <td>{reserva.estado}</td>
                    <td>{reserva.asistidaPorIA ? 'Automatica' : 'Manual'}</td>
                    <td className="d-flex gap-2">
                      <Link className="btn btn-sm btn-info" to={`/reservas/${reserva._id}`}>Ver</Link>
                      <Link className="btn btn-sm btn-warning" to={`/reservas/${reserva._id}/editar`}>Editar</Link>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(reserva._id)}>Eliminar</button>
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
