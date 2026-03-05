import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { reservasApi } from '../../api/client';

const initialState = {
  cliente: '',
  descripcion: '',
  producto: '',
  fecha: '',
  cantidad: 1,
  estado: 'pendiente',
  asistidaPorIA: true,
};

const dateToInput = (value) => {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
};

export default function ReservaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const reserva = await reservasApi.byId(id);
        setForm({
          cliente: reserva.cliente || '',
          descripcion: reserva.descripcion || '',
          producto: reserva.productoId || reserva.producto || '',
          fecha: dateToInput(reserva.fecha),
          cantidad: reserva.cantidad || 1,
          estado: reserva.estado || 'pendiente',
          asistidaPorIA: reserva.asistidaPorIA ?? true,
        });
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [id, isEdit]);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.cliente.trim() || !form.producto.trim() || !form.fecha) {
      setError('Cliente, producto y fecha son obligatorios');
      return;
    }

    if (Number(form.cantidad) < 1) {
      setError('La cantidad debe ser al menos 1');
      return;
    }

    const payload = {
      ...form,
      cantidad: Number(form.cantidad),
      fecha: new Date(form.fecha).toISOString(),
    };

    try {
      if (isEdit) {
        await reservasApi.update(id, payload);
      } else {
        await reservasApi.create(payload);
      }
      setSuccess(isEdit ? 'Reserva actualizada' : 'Reserva creada');
      setTimeout(() => navigate('/reservas'), 900);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card shadow-sm border-0 app-panel">
      <div className="card-body">
        <h2 className="h4">{isEdit ? 'Editar reserva' : 'Nueva reserva'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={onSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Cliente</label>
            <input className="form-control" name="cliente" value={form.cliente} onChange={onChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Producto (ID o nombre)</label>
            <input className="form-control" name="producto" value={form.producto} onChange={onChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Descripcion</label>
            <input className="form-control" name="descripcion" value={form.descripcion} onChange={onChange} />
          </div>

          <div className="col-md-3">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-control" name="fecha" value={form.fecha} onChange={onChange} required />
          </div>

          <div className="col-md-3">
            <label className="form-label">Cantidad</label>
            <input type="number" className="form-control" name="cantidad" value={form.cantidad} onChange={onChange} min="1" required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Estado</label>
            <select className="form-select" name="estado" value={form.estado} onChange={onChange}>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <div className="col-md-4 d-flex align-items-center">
            <div className="form-check mt-4">
              <input className="form-check-input" type="checkbox" name="asistidaPorIA" checked={form.asistidaPorIA} onChange={onChange} id="asistidaPorIA" />
              <label className="form-check-label" htmlFor="asistidaPorIA">Asistencia automatica</label>
            </div>
          </div>

          <div className="col-12 d-flex gap-2">
            <button className="btn btn-primary" type="submit">Guardar</button>
            <Link className="btn btn-secondary" to="/reservas">Cancelar</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
