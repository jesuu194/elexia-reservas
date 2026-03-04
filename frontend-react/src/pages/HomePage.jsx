import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4 p-md-5">
        <h1 className="display-6 fw-bold">Agencia de Reservas con IA Conversacional</h1>
        <p className="lead text-secondary">
          Gestiona productos y reservas para servicios de agentes de voz y chatbots inteligentes desde un solo panel.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-primary" to="/productos">Gestionar productos</Link>
          <Link className="btn btn-outline-primary" to="/reservas">Gestionar reservas</Link>
        </div>
      </div>
    </div>
  );
}
