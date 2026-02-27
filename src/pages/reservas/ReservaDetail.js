import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getReservaById } from '../../api/reservas';

export default function ReservaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getReservaById(id)
      .then(setReserva)
      .catch(() => setError('No se pudo cargar la reserva'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center my-4"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!reserva) return <div className="alert alert-warning">Reserva no encontrada</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Reserva de {reserva.cliente}</h3>
          <h6 className="card-subtitle mb-2 text-muted">ID: {reserva._id}</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Producto:</b> {reserva.producto}</li>
            <li className="list-group-item"><b>Fecha:</b> {new Date(reserva.fecha).toLocaleDateString()}</li>
            <li className="list-group-item"><b>Cantidad:</b> {reserva.cantidad}</li>
            <li className="list-group-item"><b>Estado:</b> {reserva.estado}</li>
          </ul>
          <Link className="btn btn-secondary mt-3" to="/reservas">Volver</Link>
          <button className="btn btn-warning mt-3 ms-2" onClick={() => navigate(`/reservas/${reserva._id}/editar`)}>Editar</button>
        </div>
      </div>
    </div>
  );
}
