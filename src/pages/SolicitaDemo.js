import React, { useState } from 'react';

export default function SolicitaDemo() {
  const [form, setForm] = useState({ nombre: '', email: '', restaurante: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.restaurante.trim()) {
      setError('Por favor, completa los campos obligatorios.');
      return;
    }
    setEnviado(true);
  };

  return (
    <>
      {/* Hero destacado */}
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
        <h1 style={{fontSize:'2.5rem',fontWeight:800,letterSpacing:'-1px',lineHeight:1.1}}>Solicita una Demo</h1>
        <p style={{fontSize:'1.15rem',maxWidth:600,margin:'18px auto 0 auto'}}>Descubre cómo Elexia puede revolucionar la atención y reservas de tu <b>negocio</b> (restaurantes, clínicas, talleres, belleza, gimnasios y más) con IA.</p>
        <div className="d-none d-md-block mt-3">
          <img src="https://pixabay.com/es/images/download/mentagi-robot-6654025_1920.png" alt="Robot IA" style={{width:140,borderRadius:18,boxShadow:'0 4px 24px 0 rgba(34,40,49,0.08)'}} />
        </div>
      </section>

      {/* Pasos para la demo */}
      <section className="container mb-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#e3f2fd',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>📝</span>
              <h4 style={{fontWeight:700}}>1. Rellena el formulario</h4>
              <p>Cuéntanos sobre tu negocio y tus necesidades.</p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#e8f5e9',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>🤖</span>
              <h4 style={{fontWeight:700}}>2. Prueba la IA en acción</h4>
              <p>Recibe una demo personalizada con asistentes reales y simulaciones adaptadas a tu sector.</p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#fffde7',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>🚀</span>
              <h4 style={{fontWeight:700}}>3. Empieza a automatizar</h4>
              <p>Implementa Elexia y comienza a recibir reservas y consultas 24/7 en tu negocio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario destacado */}
      <div className="container my-5" style={{maxWidth:700}}>
        <div className="beneficio-card shadow-lg p-4" style={{border:'2px solid #3bb78f',borderRadius:24,background:'#fff',boxShadow:'0 6px 32px 0 rgba(34,40,49,0.10)'}}>
          <h3 className="mb-3 text-center" style={{fontWeight:800,color:'#2e7d5a'}}>Agenda tu demo personalizada</h3>
          {enviado ? (
            <div className="alert alert-success">¡Gracias! Nuestro equipo se pondrá en contacto contigo para agendar la demo.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">Nombre *</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="restaurante" className="form-label">Negocio *</label>
                  <input type="text" className="form-control" id="restaurante" name="restaurante" value={form.restaurante} onChange={handleChange} required placeholder="Restaurante, clínica, taller..." />
                </div>
                <div className="col-md-6">
                  <label htmlFor="mensaje" className="form-label">¿Qué te gustaría automatizar?</label>
                  <input type="text" className="form-control" id="mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Reservas, citas, atención..." />
                </div>
              </div>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg px-5" type="submit">Solicitar demo</button>
              </div>
            </form>
          )}
        </div>
        <div className="mt-4 text-center" style={{color:'#2e7d5a'}}>
          <div><b>Email:</b> demo@elexia.ai</div>
          <div><b>Teléfono:</b> +34 900 123 456</div>
        </div>
      </div>

      {/* Testimonios IA */}
      <section className="container mb-5">
        <h3 className="text-center mb-4" style={{fontWeight:800,color:'#2e7d5a'}}>Negocios que ya usan Elexia</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#f3e5f5',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>⭐</span>
              <p>“Ahora nuestros pacientes reservan sus citas online y reciben recordatorios automáticos. La atención es mucho más ágil.”<br /><b>- Clínica SonrisaPlus</b></p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#e8f5e9',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>⭐</span>
              <p>“Gestionamos inscripciones y reservas de clases por WhatsApp sin saturar recepción. ¡Un antes y un después!”<br /><b>- FitZone Gym</b></p>
            </div>
          </div>
          <div className="col d-flex">
            <div className="beneficio-card flex-fill text-center" style={{background:'#fffde7',minHeight:140}}>
              <span className="icon" style={{fontSize:'2rem'}}>⭐</span>
              <p>“Nuestros clientes agendan revisiones y reciben confirmaciones automáticas. El taller está siempre lleno.”<br /><b>- AutoPro Taller</b></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
