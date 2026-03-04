const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/product.routes');
const reservaRoutes = require('./src/routes/reserva.routes');
const errorHandler = require('./src/middlewares/error.middleware');

const app = express();

connectDB().catch((err) => {
	console.error('Initial DB connection failed', err.message);
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(async (_req, _res, next) => {
	try {
		await connectDB();
		next();
	} catch (err) {
		next(err);
	}
});

// Documentación interactiva Swagger

app.get('/', (_req, res) => {
	res.json({
		name: 'Elexia Reservas API',
		status: 'running',
		docs: '/api/v1'
	});
});

app.get('/api/v1', (_req, res) => {
	res.json({
		message: 'API de Elexia Reservas',
		endpoints: {
			health: 'GET /api/v1/health',
			products: {
				create: 'POST /api/v1/products',
				list: 'GET /api/v1/products?page=1&limit=10',
				byId: 'GET /api/v1/products/:id',
				update: 'PUT /api/v1/products/:id',
				delete: 'DELETE /api/v1/products/:id'
			},
			reservas: {
				create: 'POST /api/v1/reserva/post',
				list: 'GET /api/v1/reserva/get/all?page=1&limit=10&estado=pendiente',
				byId: 'GET /api/v1/reserva/get/:id',
				update: 'PATCH /api/v1/reserva/update/:id',
				delete: 'DELETE /api/v1/reserva/delete/:id'
			}
		}
	});
});

app.get('/api/v1/health', (_req, res) => {
	res.json({ ok: true, dbReadyState: require('mongoose').connection.readyState });
});

// Rutas de productos
app.use('/api/v1/products', productRoutes);

// Rutas de reservas
app.use('/api/v1/reserva', reservaRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
