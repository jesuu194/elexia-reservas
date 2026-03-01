import React from 'react';

const servicios = [
  {
    icon: '📞',
    title: 'Atención 24/7 por Teléfono',
    desc: 'Servicios a ajo sares iabales, Munttnequsmincamamovios.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    btn: 'Ver más servicios',
  },
  {
    icon: '💬',
    title: 'Asistente WhatsApp y Chatbots',
    desc: 'Convierte a neñataye y te web. Ex amutios detallr e hueva.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    btn: 'Ver más servicios',
  },
  {
    icon: '📈',
    title: 'Aumenta tus Citas y Reservas',
    desc: 'Resqeas implementar to, citas, jorts y comtua auvionizarmes.',
    img: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80',
    btn: 'Ver más servicios',
  },
];

const industrias = [
  { icon: '🍽️', label: 'Restaurantes' },
  { icon: '🦷', label: 'Clínicas y Dentistas' },
  { icon: '💈', label: 'Barberías' },
  { icon: '🏋️', label: 'Gimnasios' },
  { icon: '🔧', label: 'Talleres y Mecánicos' },
  { icon: '💆', label: 'Spas y Estéticas' },
];

export default function Servicios() {
  return (
    <>
      {/* Fondo y hero */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(34,40,49,0.85) 0%, rgba(224,224,224,0.85) 100%)',
        color: '#fff',
        padding: '60px 0 40px 0',
        textAlign: 'center',
      }}>
        <h1 style={{fontWeight:800,fontSize:'2.5rem'}}>Nuestros <span style={{color:'#3bb78f'}}>Servicios</span></h1>
        <p style={{fontSize:'1.2rem',maxWidth:700,margin:'18px auto 0 auto'}}>Automatizamos reservas y atención al cliente con IA en cualquier tipo de negocio</p>
      </section>

      {/* Tarjetas de servicios */}
      <section className="container" style={{marginTop:-60,marginBottom:40}}>
        <div className="row g-4 justify-content-center">
          {servicios.map((s,i)=>(
            <div className="col-md-4 d-flex" key={i}>
              <div className="card shadow-lg flex-fill" style={{borderRadius:24,overflow:'hidden',background:'#fff'}}>
                <div style={{height:170,background:`url('${s.img}') center/cover no-repeat`}}></div>
                <div className="p-4">
                  <div style={{fontSize:'2.2rem',marginBottom:8}}>{s.icon}</div>
                  <h3 style={{fontWeight:700,fontSize:'1.25rem'}}>{s.title}</h3>
                  <p style={{color:'#444',minHeight:48}}>{s.desc}</p>
                  <a className="btn btn-success mt-2" style={{borderRadius:18,background:'#3bb78f',fontWeight:600}} href="#">{s.btn}</a>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-4 d-flex align-items-end">
            <div className="card shadow-lg flex-fill d-none d-md-flex align-items-center justify-content-center" style={{borderRadius:24,background:'transparent',border:'none',minHeight:320}}>
              <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" style={{width:160}} />
            </div>
          </div>
        </div>
      </section>

      {/* Industrias */}
      <section className="container mb-5">
        <div className="text-center mb-3" style={{fontWeight:700,fontSize:'1.2rem'}}>¿En qué industrias trabajamos?</div>
        <div className="text-center mb-4" style={{color:'#555'}}>Creamos asistentes de voz y chat para todo tipo de negocios con <b>reservas</b>.</div>
        <div className="row g-3 justify-content-center mb-4">
          {industrias.map((ind,i)=>(
            <div className="col-6 col-md-3 col-lg-2" key={i}>
              <div className="beneficio-card text-center" style={{background:'#f7f6f3',borderRadius:16,minHeight:80}}>
                <span style={{fontSize:'1.6rem'}}>{ind.icon}</span>
                <div style={{fontSize:'1rem',marginTop:4}}>{ind.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3" style={{fontWeight:600}}>
          + 15 años de experiencia automatizando negocios
        </div>
        <div className="clientes-elexia mt-3 justify-content-center">
          <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 1" style={{height:40,margin:'0 10px'}} />
          <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 2" style={{height:40,margin:'0 10px'}} />
          <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 3" style={{height:40,margin:'0 10px'}} />
          <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" title="Cliente 4" style={{height:40,margin:'0 10px'}} />
        </div>
      </section>
    </>
  );
}
