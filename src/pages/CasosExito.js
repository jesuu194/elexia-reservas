
import React from 'react';

const casos = [
  {
    logo: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=80&q=80',
    nombre: 'Clínica SonrisaPlus',
    testimonio: '“Ahora nuestros pacientes reservan sus citas online y reciben recordatorios automáticos. La atención es mucho más ágil.”',
    resultado: '-60% ausencias, +30% reservas digitales',
    persona: 'Dra. Martínez, Directora',
    sector: 'Clínicas Dentales',
    fondo: '#e3f2fd',
  },
  {
    logo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
    nombre: 'FitZone Gym',
    testimonio: '“La automatización de WhatsApp nos permite gestionar inscripciones y reservas de clases sin saturar recepción.”',
    resultado: '+45% reservas de clases, atención 24/7',
    persona: 'Carlos Ruiz, Gerente',
    sector: 'Gimnasios',
    fondo: '#f3e5f5',
  },
  {
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    nombre: 'AutoPro Taller',
    testimonio: '“Nuestros clientes agendan revisiones y reciben confirmaciones automáticas. El taller está siempre lleno.”',
    resultado: '+50% reservas online, menos llamadas perdidas',
    persona: 'Lucía Gómez, Encargada',
    sector: 'Talleres Mecánicos',
    fondo: '#fffde7',
  },
];

const sectores = [
  { icon: '🍽️', label: 'Restaurantes' },
  { icon: '🦷', label: 'Clínicas' },
  { icon: '💈', label: 'Barberías' },
  { icon: '🏋️', label: 'Gimnasios' },
  { icon: '🔧', label: 'Talleres' },
  { icon: '💆', label: 'Spas' },
];

export default function CasosExito() {
  return (
    <>
      {/* Hero visual alineado */}
      <section style={{
        background: `linear-gradient(rgba(34,40,49,0.65),rgba(34,40,49,0.65)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
        color: '#fff',
        padding: '60px 0 40px 0',
        textAlign: 'center',
      }}>
        <h1 style={{fontWeight:800,fontSize:'2.5rem'}}>Casos de <span style={{color:'#3bb78f'}}>Éxito</span></h1>
        <p style={{fontSize:'1.2rem',maxWidth:700,margin:'18px auto 0 auto'}}>Negocios de distintos sectores que han revolucionado su atención y reservas con Elexia.</p>
        <div className="hero-btns mt-3">
          <a className="btn btn-primary btn-lg" href="/demo">Solicita Demo</a>
        </div>
      </section>

      {/* Tarjetas de casos de éxito */}
      <section className="container" style={{marginTop:-60,marginBottom:40}}>
        <div className="row g-4 justify-content-center">
          {casos.map((c,i)=>(
            <div className="col-md-4 d-flex" key={i}>
              <div className="card shadow-lg flex-fill" style={{borderRadius:24,overflow:'hidden',background:c.fondo}}>
                <div className="d-flex align-items-center p-4 pb-0">
                  <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" style={{height:40,marginRight:16,background:'#fff',borderRadius:12,padding:4,boxShadow:'0 2px 8px 0 rgba(34,40,49,0.08)'}} />
                  <div>
                    <h3 style={{fontWeight:700,fontSize:'1.2rem',margin:0}}>{c.nombre}</h3>
                    <div style={{fontSize:'0.95rem',color:'#3bb78f'}}>{c.sector}</div>
                  </div>
                </div>
                <div className="p-4 pt-2">
                  <div style={{fontSize:'1.05rem',fontStyle:'italic',color:'#444',minHeight:56}}>{c.testimonio}</div>
                  <div style={{fontSize:'0.98rem',margin:'10px 0 0 0',color:'#2e7d5a'}}><b>{c.resultado}</b></div>
                  <div style={{fontSize:'0.95rem',color:'#888',marginTop:8}}><b>— {c.persona}</b></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sectores/industrias */}
      <section className="container mb-5">
        <div className="text-center mb-3" style={{fontWeight:700,fontSize:'1.2rem'}}>Elexia automatiza negocios en todos estos sectores:</div>
        <div className="row g-3 justify-content-center mb-4">
          {sectores.map((s,i)=>(
            <div className="col-6 col-md-3 col-lg-2" key={i}>
              <div className="beneficio-card text-center" style={{background:'#f7f6f3',borderRadius:16,minHeight:80}}>
                <span style={{fontSize:'1.6rem'}}>{s.icon}</span>
                <div style={{fontSize:'1rem',marginTop:4}}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3" style={{fontWeight:600}}>
          + 15 años de experiencia automatizando negocios
        </div>
      </section>

      {/* CTA final */}
      <div className="container mb-5">
        <div className="beneficio-card text-center p-4" style={{background:'#fff',border:'2px solid #3bb78f',borderRadius:24,maxWidth:600,margin:'0 auto'}}>
          <h4 style={{color:'#2e7d5a',fontWeight:'bold'}}>¿Quieres ser nuestro próximo caso de éxito?</h4>
          <a className="btn btn-primary btn-lg mt-2" href="/demo">Solicita una demo personalizada</a>
        </div>
      </div>
    </>
  );
}
