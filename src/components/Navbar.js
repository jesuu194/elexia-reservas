import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-elexia shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src="/logo192.png" alt="Elexia logo" style={{height:32, marginRight:10}} />
          Elexia
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/servicios">Servicios</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/casos">Casos de éxito</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <NavLink className="btn btn-demo" to="/contacto">Solicita una demo</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
