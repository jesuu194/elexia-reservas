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
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 small">
          <span>2026 Elexia Reservas</span>
          <span>React + Router + Bootstrap + API Node</span>
        </div>
      </footer>

      <ChatbotWidget />
    </div>
  );
}
