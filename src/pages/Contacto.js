import React, { useState } from 'react';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setEnviado(true);
  };

  return (
    <>
      <section className="hero-elexia" style={{
        minHeight:320,
        width:'100%',
        background: 'linear-gradient(135deg, rgba(34,40,49,0.85) 0%, rgba(224,224,224,0.85) 100%)',
      }}>
        <h1>Contacto</h1>
        <p>¿Tienes dudas o quieres una demo personalizada? Escríbenos y nuestro equipo te contactará en breve.</p>
      </section>

      <div className="container my-5" style={{maxWidth:600}}>
        <div className="beneficio-card">
          <h3>Formulario de contacto</h3>
          {enviado ? (
            <div className="alert alert-success">¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea className="form-control" id="mensaje" name="mensaje" rows={4} value={form.mensaje} onChange={handleChange} required />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
          )}
        </div>
        <div className="mt-4 text-center" style={{color:'#2e7d5a'}}>
          <div><b>Email:</b> contacto@elexia.ai</div>
          <div><b>Teléfono:</b> +34 900 123 456</div>
          <div><b>Dirección:</b> Calle Innovación 42, Madrid</div>
        </div>
      </div>
    </>
  );
}
