const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true, trim: true },
  descripcion: { type: String, default: '', trim: true },
  precio: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  fechaPublicacion: { type: Date, default: Date.now },
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
