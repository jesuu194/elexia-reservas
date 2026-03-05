import { Link, NavLink, Outlet } from 'react-router-dom';
import ChatbotWidget from './ChatbotWidget';

export default function Layout() {
  return (
    <div className="app-shell-react d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg app-navbar-react shadow-sm">
        <div className="container app-navbar-react__inner">
          <Link className="navbar-brand app-brand-react fw-bold" to="/">
            <span className="app-brand-react__dot" />
            <span className="app-brand-react__text">
              <strong>Elexia Reservas</strong>
              <small>Plataforma comercial</small>
            </span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/reservas">Reservas</NavLink></li>
              <li className="nav-item ms-lg-2">
                <NavLink className="btn btn-sm btn-light fw-semibold app-navbar-react__cta" to="/reservas/nueva">Crear reserva</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5 flex-grow-1">
        <Outlet />
      </main>

      <footer className="app-footer-react py-3 mt-auto">
        <div className="container footer-react__grid">
          <section className="footer-react__brand">
            <p className="footer-react__eyebrow mb-1">Elexia Reservas</p>
            <h3 className="h5 mb-2">Tu canal digital para vender reservas</h3>
            <p className="mb-0">Haz que cada visita termine en una oportunidad comercial real y trazable.</p>
          </section>

          <section>
            <p className="footer-react__title">Navegacion</p>
            <ul className="footer-react__links">
              <li><NavLink to="/">Inicio</NavLink></li>
              <li><NavLink to="/productos">Productos</NavLink></li>
              <li><NavLink to="/reservas">Reservas</NavLink></li>
            </ul>
          </section>

          <section>
            <p className="footer-react__title">Accion rapida</p>
            <NavLink className="btn btn-light btn-sm footer-react__cta" to="/reservas/nueva">Solicitar prueba</NavLink>
            <p className="footer-react__stack mb-0 mt-2">React + Router + Bootstrap + API Node</p>
          </section>
        </div>

        <div className="container footer-react__bottom small">
          <span>2026 Elexia Reservas. Todos los derechos reservados.</span>
        </div>
      </footer>

      <ChatbotWidget />
    </div>
  );
}
