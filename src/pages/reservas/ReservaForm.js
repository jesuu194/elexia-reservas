import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createReserva, getReservaById, updateReserva } from '../../api/reservas';

const initialState = {
  cliente: '',
  producto: '',
  fecha: '',
  cantidad: '',
  estado: 'pendiente',
};

export default function ReservaForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (edit && id) {
      setLoading(true);
      getReservaById(id)
        .then((data) => setForm({
          cliente: data.cliente || '',
          producto: data.producto || '',
          fecha: data.fecha ? data.fecha.slice(0, 10) : '',
          cantidad: data.cantidad || '',
          estado: data.estado || 'pendiente',
        }))
        .catch(() => setError('No se pudo cargar la reserva'))
        .finally(() => setLoading(false));
    }
  }, [edit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.cliente.trim()) return 'El cliente es obligatorio';
    if (form.cliente.length > 50) return 'Máximo 50 caracteres en cliente';
    if (!form.producto.trim()) return 'El producto es obligatorio';
    if (form.producto.length > 50) return 'Máximo 50 caracteres en producto';
    if (!form.fecha) return 'La fecha es obligatoria';
    if (!form.cantidad || isNaN(form.cantidad) || Number(form.cantidad) < 1) return 'Cantidad inválida';
    if (!form.estado) return 'El estado es obligatorio';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }
    setLoading(true);
    try {
      if (edit && id) {
        await updateReserva(id, {
          ...form,
          cantidad: Number(form.cantidad),
        });
        setSuccess('Reserva actualizada correctamente');
      } else {
        await createReserva({
          ...form,
          cantidad: Number(form.cantidad),
        });
        setSuccess('Reserva creada correctamente');
        setForm(initialState);
      }
      setTimeout(() => navigate('/reservas'), 1000);
    } catch (err) {
      setError('No se pudo guardar la reserva');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>{edit ? 'Editar reserva' : 'Nueva reserva'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="cliente">Cliente</label>
          <input id="cliente" name="cliente" className="form-control" value={form.cliente} onChange={handleChange} maxLength={50} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label htmlFor="producto">Producto</label>
          <input id="producto" name="producto" className="form-control" value={form.producto} onChange={handleChange} maxLength={50} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha">Fecha</label>
          <input id="fecha" name="fecha" type="date" className="form-control" value={form.fecha} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad">Cantidad</label>
          <input id="cantidad" name="cantidad" type="number" className="form-control" value={form.cantidad} onChange={handleChange} min={1} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label htmlFor="estado">Estado</label>
          <select id="estado" name="estado" className="form-select" value={form.estado} onChange={handleChange} required disabled={loading}>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button className="btn btn-primary" type="submit" disabled={loading}>{edit ? 'Actualizar' : 'Crear'}</button>
        <button className="btn btn-secondary ms-2" type="button" onClick={() => navigate('/reservas')} disabled={loading}>Cancelar</button>
      </form>
    </div>
  );
}
