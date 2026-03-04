import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productsApi } from '../../api/client';

const initialState = {
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  disponible: true,
};

export default function ProductFormPage() {
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
        const product = await productsApi.byId(id);
        setForm({
          nombre: product.nombre || '',
          descripcion: product.descripcion || '',
          precio: product.precio || 0,
          stock: product.stock || 0,
          disponible: product.disponible ?? true,
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

    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (Number(form.precio) < 0 || Number(form.stock) < 0) {
      setError('Precio y stock deben ser valores no negativos');
      return;
    }

    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    try {
      if (isEdit) {
        await productsApi.update(id, payload);
      } else {
        await productsApi.create(payload);
      }
      setSuccess(isEdit ? 'Producto actualizado' : 'Producto creado');
      setTimeout(() => navigate('/productos'), 900);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={onSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input className="form-control" name="nombre" value={form.nombre} onChange={onChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Descripcion</label>
            <input className="form-control" name="descripcion" value={form.descripcion} onChange={onChange} required />
          </div>

          <div className="col-md-3">
            <label className="form-label">Precio</label>
            <input type="number" className="form-control" name="precio" value={form.precio} onChange={onChange} min="0" required />
          </div>

          <div className="col-md-3">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" name="stock" value={form.stock} onChange={onChange} min="0" required />
          </div>

          <div className="col-md-3 d-flex align-items-center">
            <div className="form-check mt-4">
              <input className="form-check-input" type="checkbox" name="disponible" checked={form.disponible} onChange={onChange} id="disponible" />
              <label className="form-check-label" htmlFor="disponible">Disponible</label>
            </div>
          </div>

          <div className="col-12 d-flex gap-2">
            <button className="btn btn-primary" type="submit">Guardar</button>
            <Link className="btn btn-secondary" to="/productos">Cancelar</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
