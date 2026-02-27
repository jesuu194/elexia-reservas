import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getReservas, deleteReserva } from '../../api/reservas';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [estado, setEstado] = useState('');
  const navigate = useNavigate();

  const fetchReservas = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getReservas(1, 10, estado);
      setReservas(data.reservas);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReservas();
    // eslint-disable-next-line
  }, [estado]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta reserva?')) return;
    try {
      await deleteReserva(id);
      setSuccess('Reserva eliminada correctamente');
      fetchReservas();
    } catch (err) {
      setError('No se pudo eliminar la reserva');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Reservas</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="filtro-estado" className="form-label">Filtrar por estado</label>
          <select id="filtro-estado" className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
            <option value="">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div className="col-md-8 text-end">
          <Link className="btn btn-success" to="/reservas/nueva">Nueva reserva</Link>
        </div>
      </div>
      {loading && <div className="text-center my-4"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r._id}>
              <td>{r.cliente}</td>
              <td>{r.producto}</td>
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
              <td>{r.cantidad}</td>
              <td>{r.estado}</td>
              <td>
                <Link className="btn btn-sm btn-info me-1" to={`/reservas/${r._id}`}>Ver</Link>
                <Link className="btn btn-sm btn-warning me-1" to={`/reservas/${r._id}/editar`}>Editar</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
