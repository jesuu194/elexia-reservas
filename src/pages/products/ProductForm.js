import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../api/products';

const initialState = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
};

export default function ProductForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (edit && id) {
      setLoading(true);
      getProductById(id)
        .then((data) => setForm({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          precio: data.precio || '',
          stock: data.stock || '',
        }))
        .catch(() => setError('No se pudo cargar el producto'))
        .finally(() => setLoading(false));
    }
  }, [edit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio';
    if (form.nombre.length > 50) return 'Máximo 50 caracteres en nombre';
    if (!form.descripcion.trim()) return 'La descripción es obligatoria';
    if (form.descripcion.length > 200) return 'Máximo 200 caracteres en descripción';
    if (!form.precio || isNaN(form.precio) || Number(form.precio) < 0) return 'Precio inválido';
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) return 'Stock inválido';
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
        await updateProduct(id, {
          ...form,
          precio: Number(form.precio),
          stock: Number(form.stock),
        });
        setSuccess('Producto actualizado correctamente');
      } else {
        await createProduct({
          ...form,
          precio: Number(form.precio),
          stock: Number(form.stock),
        });
        setSuccess('Producto creado correctamente');
        setForm(initialState);
      }
      setTimeout(() => navigate('/productos'), 1000);
    } catch (err) {
      setError('No se pudo guardar el producto');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>{edit ? 'Editar producto' : 'Nuevo producto'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} maxLength={50} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" name="descripcion" className="form-control" value={form.descripcion} onChange={handleChange} maxLength={200} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label htmlFor="precio">Precio</label>
          <input id="precio" name="precio" type="number" className="form-control" value={form.precio} onChange={handleChange} min={0} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label htmlFor="stock">Stock</label>
          <input id="stock" name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} min={0} required disabled={loading} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button className="btn btn-primary" type="submit" disabled={loading}>{edit ? 'Actualizar' : 'Crear'}</button>
        <button className="btn btn-secondary ms-2" type="button" onClick={() => navigate('/productos')} disabled={loading}>Cancelar</button>
      </form>
    </div>
  );
}
