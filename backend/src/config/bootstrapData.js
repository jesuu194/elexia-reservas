const Product = require('../models/Product');
const Reserva = require('../models/Reserva');

const addDays = (baseDate, days) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date;
};

const buildProducts = () => {
  const baseNames = [
    'Agente de Voz Basico',
    'Agente de Voz Premium',
    'Chatbot FAQ Inteligente',
    'Chatbot Ventas IA',
    'Bot WhatsApp Reservas',
    'Automatizacion Recordatorios',
    'Integracion Calendario IA',
    'Panel Analitico de Reservas',
    'Asistente Omnicanal',
    'Suite Conversacional Negocios'
  ];

  return baseNames.map((nombre, index) => ({
    nombre,
    descripcion: `Servicio IA orientado a reservas (${index + 1}).`,
    precio: 99 + index * 40,
    stock: 30 + index * 5,
    fechaPublicacion: addDays(new Date('2026-01-01'), index),
    disponible: true
  }));
};

const buildReservas = (products) => {
  const clientes = [
    'Juan Perez',
    'Laura Garcia',
    'Carlos Diaz',
    'Marta Sanchez',
    'Alejandro Ruiz',
    'Sofia Moreno',
    'Daniel Torres',
    'Irene Martin',
    'Pablo Gomez',
    'Lucia Romero'
  ];

  const estados = ['pendiente', 'confirmada', 'cancelada'];
  const now = new Date();
  const reservas = [];

  for (let i = 0; i < 20; i += 1) {
    const product = products[i % products.length];
    reservas.push({
      nombreCliente: `${clientes[i % clientes.length]} ${i + 1}`,
      descripcion: `Reserva automatizada desde canal IA #${i + 1}`,
      fecha: addDays(now, i + 1),
      producto: product._id,
      cantidad: (i % 3) + 1,
      estado: estados[i % estados.length],
      asistidaPorIA: i % 2 === 0
    });
  }

  return reservas;
};

const ensureMinimumData = async () => {
  const productCount = await Product.countDocuments();
  const reservaCount = await Reserva.countDocuments();

  if (productCount >= 10 && reservaCount >= 20) {
    return;
  }

  await Product.deleteMany({});
  await Reserva.deleteMany({});

  const createdProducts = await Product.insertMany(buildProducts());
  await Reserva.insertMany(buildReservas(createdProducts));

  console.log('Datos de ejemplo cargados: 10 productos y 20 reservas');
};

module.exports = { ensureMinimumData };
