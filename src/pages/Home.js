import React from 'react';

export default function Home() {
  return (
    <>
      {/* Hero principal */}
      <section 
        className="hero-elexia d-flex flex-column align-items-center justify-content-center"
        style={{
          paddingTop:40,
          paddingBottom:40,
          minHeight:420,
          width:'100%',
          background: 'linear-gradient(135deg, rgba(34,40,49,0.85) 0%, rgba(224,224,224,0.85) 100%)',
        }}
      >
        <h1 style={{fontSize:'2.7rem',fontWeight:800,letterSpacing:'-1px',lineHeight:1.1}}>Agencia de Asistentes<br /><span style={{color:'#3bb78f'}}>para Reservas de Negocios</span></h1>
        <p style={{fontSize:'1.25rem',maxWidth:600,margin:'18px auto 0 auto'}}>Automatizamos reservas y atención para <b>negocios</b> (restaurantes, clínicas, talleres, centros de belleza, eventos y más) con <b>inteligencia artificial</b> y tecnología de vanguardia.</p>
        <div className="hero-btns mt-4 mb-2">
          <a className="btn btn-primary" href="/demo">Solicitar Demo</a>
          <a className="btn btn-secondary" href="/casos">Ver Casos de Éxito</a>
        </div>
      </section>
      {/* IA Features mejor cuadradas */}
      <section className="container my-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#e8f5e9',minHeight:180}}>
              <span className="icon" style={{fontSize:'2.5rem',display:'block',marginBottom:8}}>
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#3bb78f" opacity=".15"/><path d="M18 10c-3.31 0-6 2.24-6 5 0 1.38.93 2.63 2.44 3.5-.29.6-.94 1.5-2.44 2.5 2.5 0 4.5-1.5 6-1.5s3.5 1.5 6 1.5c-1.5-1-2.15-1.9-2.44-2.5C23.07 17.63 24 16.38 24 15c0-2.76-2.69-5-6-5z" fill="#3bb78f"/></svg>
              </span>
              <h3 style={{fontWeight:700}}>IA Conversacional Avanzada</h3>
              <p>Responde a clientes en lenguaje natural, aprende de cada interacción y mejora continuamente gracias a modelos de machine learning.</p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#e3f2fd',minHeight:180}}>
              <span className="icon" style={{fontSize:'2.5rem',display:'block',marginBottom:8}}>
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#1976d2" opacity=".15"/><path d="M18 10v8l6 3" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <h3 style={{fontWeight:700}}>Automatización Instantánea</h3>
              <p>Procesa reservas, cancelaciones y consultas en segundos, sin esperas ni errores humanos.</p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#fffde7',minHeight:180}}>
              <span className="icon" style={{fontSize:'2.5rem',display:'block',marginBottom:8}}>
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#fbc02d" opacity=".15"/><path d="M18 12v8m0 0l4-4m-4 4l-4-4" stroke="#fbc02d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <h3 style={{fontWeight:700}}>Reconocimiento de Voz</h3>
              <p>Permite a tus clientes reservar o consultar información hablando, como si conversaran con tu staff.</p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#f3e5f5',minHeight:180}}>
              <span className="icon" style={{fontSize:'2.5rem',display:'block',marginBottom:8}}>
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#7b1fa2" opacity=".15"/><path d="M12 18h12M18 12v12" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <h3 style={{fontWeight:700}}>Integración Multicanal</h3>
              <p>WhatsApp, Web, Facebook, Google Assistant y más. Donde están tus clientes, está Elexia.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Animación IA y sección extra */}
      <div className="container text-center mb-5">
        <div style={{
          fontSize:'2rem',
          color:'#222',
          marginTop:16,
          fontWeight:'bold',
          background:'rgba(255,255,255,0.85)',
          borderRadius:12,
          padding:'16px 32px',
          display:'inline-block',
          boxShadow:'0 2px 8px 0 rgba(34,40,49,0.08)'
        }}>
          IA que aprende y evoluciona con tu negocio de reservas
        </div>
      </div>

      {/* Nueva sección: ¿Por qué elegir Elexia? */}
      <section className="container mb-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="beneficio-card text-center" style={{background:'#fff',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>🔒</span>
              <h4 style={{fontWeight:700}}>Seguridad y privacidad</h4>
              <p>Datos cifrados, cumplimiento RGPD y máxima protección para tu negocio y tus clientes.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="beneficio-card text-center" style={{background:'#fff',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>📈</span>
              <h4 style={{fontWeight:700}}>Resultados medibles</h4>
              <p>Panel de control con analítica avanzada y reportes automáticos para tomar mejores decisiones.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="beneficio-card text-center" style={{background:'#fff',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>🤝</span>
              <h4 style={{fontWeight:700}}>Soporte humano 24/7</h4>
              <p>Equipo de expertos en IA y hostelería siempre disponible para ayudarte a crecer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="beneficios-elexia container">
        <div className="beneficio-card">
          <span className="icon">📞</span>
          <h3>Atención 24/7 y Reservas Automáticas</h3>
          <p>Recibe llamadas, gestiona reservas y responde preguntas en segundos para cualquier tipo de negocio.</p>
        </div>
        <div className="beneficio-card">
          <span className="icon">💬</span>
          <h3>Asistente por Voz, WhatsApp y Web</h3>
          <p>Responde llamadas y mensajes 24/7 con IA personalizada para restaurantes, clínicas, talleres, belleza y más.</p>
        </div>
        <div className="beneficio-card">
          <span className="icon">📈</span>
          <h3>Aumenta tus Reservas y Ventas</h3>
          <p>Convierte consultas en clientes y haz crecer tu negocio 24/7 con automatización inteligente.</p>
        </div>
      </section>

      {/* Logos clientes */}
      <div className="clientes-elexia">
        <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 1" style={{height:40,margin:'0 10px'}} />
        <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 2" style={{height:40,margin:'0 10px'}} />
        <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 3" style={{height:40,margin:'0 10px'}} />
        <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 4" style={{height:40,margin:'0 10px'}} />
      </div>

      {/* Experiencia */}
      <div className="text-center mb-4" style={{fontWeight:'bold',color:'#2e7d5a',fontSize:'1.1rem'}}>
        +15 años de experiencia automatizando restaurantes
      </div>
    </>
  );
}
