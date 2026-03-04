import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="d-grid gap-4">
      <section className="hero-react">
        <span className="hero-react__badge">Sistema comercial para agencias IA</span>
        <h1 className="display-5 fw-bold mt-2 mb-3">Dos frontends, una operacion clara y escalable</h1>
        <p className="lead mb-4">
          Controla productos y reservas desde interfaces modernas con el mismo backend centralizado.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-primary" to="/productos">Gestionar productos</Link>
          <Link className="btn btn-outline-light" to="/reservas">Gestionar reservas</Link>
        </div>
      </section>

      <section className="row g-3">
        <div className="col-md-4">
          <article className="card app-panel h-100 border-0">
            <div className="card-body">
              <p className="text-uppercase small text-secondary mb-2">Productividad</p>
              <p className="display-6 fw-bold mb-1">+35%</p>
              <p className="mb-0">Flujos de alta y edicion mas rapidos para equipos comerciales.</p>
            </div>
          </article>
        </div>
        <div className="col-md-4">
          <article className="card app-panel h-100 border-0">
            <div className="card-body">
              <p className="text-uppercase small text-secondary mb-2">Visibilidad</p>
              <p className="display-6 fw-bold mb-1">360</p>
              <p className="mb-0">Seguimiento completo por estado y por fecha de reserva.</p>
            </div>
          </article>
        </div>
        <div className="col-md-4">
          <article className="card app-panel h-100 border-0">
            <div className="card-body">
              <p className="text-uppercase small text-secondary mb-2">Cobertura</p>
              <p className="display-6 fw-bold mb-1">24/7</p>
              <p className="mb-0">Operacion continua para voz, web y mensajeria.</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
