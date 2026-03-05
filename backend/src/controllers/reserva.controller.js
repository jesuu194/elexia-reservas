
const Reserva = require('../models/Reserva');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const serializeReserva = (reserva) => {
  const value = reserva?.toObject ? reserva.toObject() : reserva;
  const productoValue = typeof value?.producto === 'object' && value?.producto !== null
    ? (value.producto.nombre ?? value.producto._id)
    : value?.producto;

  return {
    ...value,
    cliente: value?.nombreCliente,
    descripcion: value?.descripcion ?? '',
    producto: productoValue,
    productoId: typeof value?.producto === 'object' && value?.producto !== null
      ? String(value.producto._id)
      : String(value?.producto ?? ''),
    asistidaPorIA: value?.asistidaPorIA ?? true
  };
};

const resolveProduct = async (productoInput) => {
  if (mongoose.Types.ObjectId.isValid(productoInput)) {
    return Product.findById(productoInput);
  }

  return Product.findOne({ nombre: productoInput });
};

// Obtener todas las reservas con paginación y filtro por estado
exports.getAllReservas = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const estado = req.query.estado;

    const filter = estado ? { estado } : {};
    const reservas = await Reserva.find(filter).populate('producto').skip(skip).limit(limit);
    const total = await Reserva.countDocuments(filter);
    res.json({ reservas: reservas.map(serializeReserva), page, total });
  } catch (err) { next(err); }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res, next) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('producto');
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(serializeReserva(reserva));
  } catch (err) { next(err); }
};

// Crear una reserva con validaciones y reglas de negocio
exports.createReserva = async (req, res, next) => {
  try {
    const nombreCliente = req.body.nombreCliente ?? req.body.cliente;
    const { fecha, producto, cantidad, descripcion, asistidaPorIA } = req.body;
    if (!nombreCliente || !fecha || !producto || !cantidad) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Regla: No permitir reservas en fechas pasadas
    if (new Date(fecha) < new Date()) {
      return res.status(400).json({ message: 'No se puede reservar en fechas pasadas' });
    }
    // Regla: No permitir reservar más stock del disponible
    const prod = await resolveProduct(producto);
    if (!prod) return res.status(404).json({ message: 'Producto no encontrado' });
    if (cantidad > prod.stock) {
      return res.status(400).json({ message: 'No hay suficiente stock disponible' });
    }
    // Regla: No permitir reservas duplicadas para el mismo cliente, producto y fecha
    const exists = await Reserva.findOne({ nombreCliente, producto: prod._id, fecha });
    if (exists) {
      return res.status(400).json({ message: 'Ya existe una reserva para este cliente, producto y fecha' });
    }
    // Crear reserva
    const reserva = await Reserva.create({
      nombreCliente,
      descripcion: descripcion ?? '',
      fecha,
      producto: prod._id,
      cantidad,
      asistidaPorIA: asistidaPorIA ?? true
    });
    // Actualizar stock del producto
    prod.stock -= cantidad;
    await prod.save();
    const created = await reserva.populate('producto');
    res.status(201).json(serializeReserva(created));
  } catch (err) { next(err); }
};

// Actualizar una reserva
exports.updateReserva = async (req, res, next) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    const {
      estado,
      cantidad,
      cliente,
      nombreCliente,
      descripcion,
      asistidaPorIA,
      fecha,
      producto
    } = req.body;

    if (estado) reserva.estado = estado;
    if (cantidad) reserva.cantidad = cantidad;
    if (cliente || nombreCliente) reserva.nombreCliente = nombreCliente ?? cliente;
    if (descripcion !== undefined) reserva.descripcion = descripcion;
    if (asistidaPorIA !== undefined) reserva.asistidaPorIA = asistidaPorIA;
    if (fecha) reserva.fecha = fecha;

    if (producto) {
      const resolvedProduct = await resolveProduct(producto);
      if (!resolvedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      reserva.producto = resolvedProduct._id;
    }

    await reserva.save();
    const updated = await reserva.populate('producto');
    res.json(serializeReserva(updated));
  } catch (err) { next(err); }
};

// Eliminar una reserva
exports.deleteReserva = async (req, res, next) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada' });
  } catch (err) { next(err); }
};
