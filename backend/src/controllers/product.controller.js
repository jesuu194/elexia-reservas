const Product = require('../models/Product');

const normalizeProductInput = (body = {}) => ({
  nombre: body.nombre ?? body.name,
  descripcion: body.descripcion ?? body.description ?? '',
  precio: body.precio ?? body.price,
  stock: body.stock,
  fechaPublicacion: body.fechaPublicacion,
  disponible: body.disponible
});

exports.createProduct = async (req, res, next) => {
  try {
    const payload = normalizeProductInput(req.body);

    if (!payload.nombre || payload.precio === undefined || payload.stock === undefined) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const existing = await Product.findOne({ nombre: payload.nombre });
    if (existing) return res.status(400).json({ message: 'Ya existe un producto con ese nombre' });

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.json({ products, page, total });
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const payload = normalizeProductInput(req.body);
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    if (payload.nombre !== undefined) product.nombre = payload.nombre;
    if (payload.descripcion !== undefined) product.descripcion = payload.descripcion;
    if (payload.precio !== undefined) product.precio = payload.precio;
    if (payload.stock !== undefined) product.stock = payload.stock;
    if (payload.fechaPublicacion !== undefined) product.fechaPublicacion = payload.fechaPublicacion;
    if (payload.disponible !== undefined) product.disponible = payload.disponible;

    await product.save();
    res.json(product);
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
