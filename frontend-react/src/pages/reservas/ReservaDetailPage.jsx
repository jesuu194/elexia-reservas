import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { reservasApi } from '../../api/client';

export default function ReservaDetailPage() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await reservasApi.byId(id);
        setReserva(data);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!reserva) return <div className="alert alert-info">Cargando...</div>;

  return (
    <section className="card shadow-sm border-0 app-panel">
      <div className="card-body">
        <h2 className="h4">Reserva de {reserva.cliente}</h2>
        <ul className="list-group mb-3">
          <li className="list-group-item"><strong>Producto:</strong> {String(reserva.producto || '').replace(/\bIA\b/g, '').replace(/\s{2,}/g, ' ').trim()}</li>
          <li className="list-group-item"><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</li>
          <li className="list-group-item"><strong>Cantidad:</strong> {reserva.cantidad}</li>
          <li className="list-group-item"><strong>Estado:</strong> {reserva.estado}</li>
          <li className="list-group-item"><strong>Descripcion:</strong> {reserva.descripcion}</li>
          <li className="list-group-item"><strong>Asistencia:</strong> {reserva.asistidaPorIA ? 'Automatica' : 'Manual'}</li>
        </ul>
        <Link className="btn btn-secondary" to="/reservas">Volver</Link>
      </div>
    </section>
  );
}
