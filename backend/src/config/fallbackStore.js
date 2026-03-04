const { randomUUID } = require('crypto');

const products = [];
const reservas = [];

const sampleProducts = [
  { nombre: 'Chatbot para restaurante', descripcion: 'Toma reservas de mesas', precio: 299, stock: 15 },
  { nombre: 'Agente de voz para clinica', descripcion: 'Gestion de citas y recordatorios', precio: 449, stock: 12 },
  { nombre: 'Bot de WhatsApp para gimnasio', descripcion: 'Reserva de clases y cupos', precio: 259, stock: 20 },
  { nombre: 'Asistente de agenda para peluqueria', descripcion: 'Citas por servicio y profesional', precio: 219, stock: 18 },
  { nombre: 'Recepcion virtual para hotel', descripcion: 'Reservas y pre check-in', precio: 549, stock: 8 },
  { nombre: 'Bot para centro estetico', descripcion: 'Reservas con promociones', precio: 239, stock: 16 },
  { nombre: 'Agente comercial para academia', descripcion: 'Consultas y matriculas', precio: 319, stock: 11 },
  { nombre: 'Bot para consultoria', descripcion: 'Captacion de leads y reuniones', precio: 289, stock: 14 },
  { nombre: 'Asistente para taller mecanico', descripcion: 'Citas de mantenimiento', precio: 199, stock: 19 },
  { nombre: 'Bot omnicanal para ecommerce', descripcion: 'Postventa y seguimiento', precio: 379, stock: 9 }
];

const estados = ['pendiente', 'confirmada', 'cancelada'];

const nowPlusDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const seed = () => {
  if (products.length > 0 || reservas.length > 0) return;

  for (const p of sampleProducts) {
    products.push({
      _id: randomUUID(),
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      stock: p.stock,
      fechaPublicacion: new Date().toISOString(),
      disponible: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  for (let i = 0; i < 20; i += 1) {
    const product = products[i % products.length];
    const cantidad = (i % 3) + 1;
    reservas.push({
      _id: randomUUID(),
      nombreCliente: `Cliente ${i + 1}`,
      cliente: `Cliente ${i + 1}`,
      descripcion: `Reserva automatizada ${i + 1}`,
      fecha: nowPlusDays((i % 14) + 1),
      productoId: product._id,
      producto: product.nombre,
      cantidad,
      estado: estados[i % estados.length],
      asistidaPorIA: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
};

const listProducts = (page = 1, limit = 10) => {
  seed();
  const start = (page - 1) * limit;
  return {
    products: clone(products.slice(start, start + limit)),
    page,
    total: products.length
  };
};

const findProductById = (id) => {
  seed();
  return clone(products.find((p) => p._id === id) || null);
};

const createProduct = (payload) => {
  seed();
  if (products.some((p) => p.nombre.toLowerCase() === String(payload.nombre).toLowerCase())) {
    const err = new Error('Ya existe un producto con ese nombre');
    err.statusCode = 400;
    throw err;
  }

  const item = {
    _id: randomUUID(),
    nombre: payload.nombre,
    descripcion: payload.descripcion ?? '',
    precio: Number(payload.precio),
    stock: Number(payload.stock),
    fechaPublicacion: payload.fechaPublicacion ?? new Date().toISOString(),
    disponible: payload.disponible ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  products.push(item);
  return clone(item);
};

const updateProduct = (id, payload) => {
  seed();
  const idx = products.findIndex((p) => p._id === id);
  if (idx === -1) return null;

  const current = products[idx];
  const next = {
    ...current,
    ...payload,
    precio: payload.precio !== undefined ? Number(payload.precio) : current.precio,
    stock: payload.stock !== undefined ? Number(payload.stock) : current.stock,
    updatedAt: new Date().toISOString()
  };
  products[idx] = next;
  return clone(next);
};

const deleteProduct = (id) => {
  seed();
  const idx = products.findIndex((p) => p._id === id);
  if (idx === -1) return null;
  const [removed] = products.splice(idx, 1);
  return clone(removed);
};

const listReservas = (page = 1, limit = 10, estado = '') => {
  seed();
  const filtered = estado ? reservas.filter((r) => r.estado === estado) : reservas;
  const start = (page - 1) * limit;
  return {
    reservas: clone(filtered.slice(start, start + limit)),
    page,
    total: filtered.length
  };
};

const findReservaById = (id) => {
  seed();
  return clone(reservas.find((r) => r._id === id) || null);
};

const createReserva = (payload) => {
  seed();
  const product = products.find((p) => p._id === payload.producto || p.nombre === payload.producto);
  if (!product) {
    const err = new Error('Producto no encontrado');
    err.statusCode = 404;
    throw err;
  }

  const item = {
    _id: randomUUID(),
    nombreCliente: payload.nombreCliente,
    cliente: payload.nombreCliente,
    descripcion: payload.descripcion ?? '',
    fecha: payload.fecha,
    productoId: product._id,
    producto: product.nombre,
    cantidad: Number(payload.cantidad),
    estado: payload.estado ?? 'pendiente',
    asistidaPorIA: payload.asistidaPorIA ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  reservas.push(item);
  return clone(item);
};

const updateReserva = (id, payload) => {
  seed();
  const idx = reservas.findIndex((r) => r._id === id);
  if (idx === -1) return null;

  const current = reservas[idx];
  let productName = current.producto;
  let productId = current.productoId;
  if (payload.producto) {
    const product = products.find((p) => p._id === payload.producto || p.nombre === payload.producto);
    if (!product) {
      const err = new Error('Producto no encontrado');
      err.statusCode = 404;
      throw err;
    }
    productName = product.nombre;
    productId = product._id;
  }

  const next = {
    ...current,
    nombreCliente: payload.nombreCliente ?? payload.cliente ?? current.nombreCliente,
    cliente: payload.nombreCliente ?? payload.cliente ?? current.cliente,
    descripcion: payload.descripcion ?? current.descripcion,
    fecha: payload.fecha ?? current.fecha,
    producto: productName,
    productoId: productId,
    cantidad: payload.cantidad !== undefined ? Number(payload.cantidad) : current.cantidad,
    estado: payload.estado ?? current.estado,
    asistidaPorIA: payload.asistidaPorIA !== undefined ? payload.asistidaPorIA : current.asistidaPorIA,
    updatedAt: new Date().toISOString()
  };

  reservas[idx] = next;
  return clone(next);
};

const deleteReserva = (id) => {
  seed();
  const idx = reservas.findIndex((r) => r._id === id);
  if (idx === -1) return null;
  const [removed] = reservas.splice(idx, 1);
  return clone(removed);
};

module.exports = {
  listProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  listReservas,
  findReservaById,
  createReserva,
  updateReserva,
  deleteReserva
};
