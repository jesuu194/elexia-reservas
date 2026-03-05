import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="d-grid gap-4">
      <section className="hero-react">
        <span className="hero-react__badge">Elexia - Automatizacion de reservas</span>
        <h1 className="display-5 fw-bold mt-2 mb-3">Automatiza reservas para restaurantes, clinicas, gimnasios y mas</h1>
        <p className="lead mb-4">
          En Elexia convertimos consultas en reservas confirmadas con chatbots y agentes de voz que atienden 24/7.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-primary" to="/reservas">Ver pipeline de reservas</Link>
          <Link className="btn btn-outline-light" to="/productos">Explorar servicios</Link>
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

      <section className="card app-panel border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 className="h4 mb-0">Sectores donde Elexia ya encaja</h2>
            <span className="pill">Implementacion rapida</span>
          </div>

          <div className="industries-grid">
            <article className="industry-card"><h3>Restaurantes</h3><p>Reserva de mesas, turnos y confirmaciones automaticas.</p></article>
            <article className="industry-card"><h3>Clinicas</h3><p>Agenda de citas, recordatorios y reprogramaciones sin friccion.</p></article>
            <article className="industry-card"><h3>Gimnasios</h3><p>Reservas de clases, cupos y renovaciones automatizadas.</p></article>
            <article className="industry-card"><h3>Centros de belleza</h3><p>Citas por servicio y profesional con confirmacion inmediata.</p></article>
            <article className="industry-card"><h3>Talleres y academias</h3><p>Plazas, calendario y asistencia automatizada.</p></article>
            <article className="industry-card"><h3>Consultorias</h3><p>Captacion automatica de leads y reuniones calificadas.</p></article>
          </div>
        </div>
      </section>

      <section className="card app-panel border-0">
        <div className="card-body">
          <h2 className="h4 mb-3">Como trabajamos en Elexia</h2>
          <div className="workflow-grid">
            <article className="workflow-step"><span>1</span><h3>Diagnostico</h3><p>Mapeamos tus canales y reglas del negocio.</p></article>
            <article className="workflow-step"><span>2</span><h3>Configuracion</h3><p>Entrenamos chatbot y voz con tu informacion real.</p></article>
            <article className="workflow-step"><span>3</span><h3>Lanzamiento</h3><p>Publicamos y conectamos con tu equipo comercial.</p></article>
            <article className="workflow-step"><span>4</span><h3>Optimizacion</h3><p>Mejoramos conversion y calidad de reservas cada semana.</p></article>
          </div>
        </div>
      </section>
    </div>
  );
}
