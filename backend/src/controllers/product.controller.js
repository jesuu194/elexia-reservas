const Product = require('../models/Product');
const mongoose = require('mongoose');
const fallbackStore = require('../config/fallbackStore');

const useFallback = () => mongoose.connection.readyState !== 1;

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

    if (useFallback()) {
      const product = fallbackStore.createProduct(payload);
      return res.status(201).json(product);
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

    if (useFallback()) {
      return res.json(fallbackStore.listProducts(page, limit));
    }

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.json({ products, page, total });
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    if (useFallback()) {
      const product = fallbackStore.findProductById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Not found' });
      return res.json(product);
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const payload = normalizeProductInput(req.body);

    if (useFallback()) {
      const product = fallbackStore.updateProduct(req.params.id, payload);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
      return res.json(product);
    }

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
    if (useFallback()) {
      const product = fallbackStore.deleteProduct(req.params.id);
      if (!product) return res.status(404).json({ message: 'Not found' });
      return res.json({ message: 'Deleted' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
