import React from 'react';

export default function Nosotros() {
  return (
    <>
      <section className="hero-elexia" style={{minHeight:320}}>
        <h1>Sobre Elexia</h1>
        <p>Expertos en inteligencia artificial y automatización para restaurantes. +15 años de experiencia.</p>
        <div className="hero-btns">
          <a className="btn btn-primary" href="/contacto">Solicita Demo</a>
        </div>
      </section>

      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="beneficio-card h-100">
              <span className="icon">🎯</span>
              <h3>Misión</h3>
              <p>Impulsar la digitalización de la hostelería, mejorando la experiencia de clientes y la eficiencia operativa de los restaurantes.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="beneficio-card h-100">
              <span className="icon">🌍</span>
              <h3>Visión</h3>
              <p>Ser la agencia líder en automatización inteligente para restaurantes en Europa y Latinoamérica.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="beneficio-card h-100">
              <span className="icon">💡</span>
              <h3>Valores</h3>
              <ul style={{paddingLeft:20}}>
                <li>Innovación constante</li>
                <li>Orientación al cliente</li>
                <li>Transparencia y ética</li>
                <li>Compromiso con la calidad</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="beneficio-card h-100">
              <span className="icon">👨‍💻</span>
              <h3>Equipo</h3>
              <p>Formado por ingenieros, expertos en IA, atención al cliente y hostelería. Trabajamos juntos para ofrecer soluciones a medida.</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <h4 style={{color:'#2e7d5a',fontWeight:'bold'}}>¿Quieres formar parte de Elexia?</h4>
          <a className="btn btn-primary btn-lg mt-2" href="/contacto">Únete a nuestro equipo</a>
        </div>
      </div>
    </>
  );
}
