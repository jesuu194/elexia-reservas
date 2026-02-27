import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-elexia mt-auto">
      <div className="container">
        <div className="mb-2">
          <img src="/logo192.png" alt="Elexia logo" style={{height:28, verticalAlign:'middle', marginRight:8}} />
          <span style={{fontWeight:'bold', fontSize:'1.1rem'}}>Elexia</span>
        </div>
        <div className="mb-2">&copy; 2026 Elexia. Todos los derechos reservados.</div>
        <div style={{fontSize:'0.95rem', opacity:0.7}}>Automatización de reservas y atención con IA para restaurantes.</div>
      </div>
    </footer>
  );
}
