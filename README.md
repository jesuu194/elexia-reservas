
# Proyecto Final Integrador — Elexia Reservas IA

## Descripcion del proyecto
Aplicacion full-stack para gestionar productos y reservas de una agencia de automatizacion con agentes de voz y chatbots con IA.

- Backend: `Node.js + Express + MongoDB`
- Frontend 1: `Angular`
- Frontend 2: `React`
- UI: `Bootstrap`

## Problema que resuelve
Negocios que venden soluciones de IA conversacional necesitan controlar su catalogo de servicios y el ciclo completo de reservas desde interfaces modernas, con validaciones de negocio y feedback claro para el usuario.

## Entidades y campos

### Product
- `_id`
- `nombre`
- `descripcion`
- `precio` (numerico)
- `stock` (numerico)
- `fechaPublicacion` (fecha)
- `disponible` (booleano)
- `createdAt`
- `updatedAt`

### Reserva
- `_id`
- `nombreCliente`
- `descripcion`
- `producto` (ObjectId ref Product)
- `cantidad` (numerico)
- `fecha` (fecha)
- `estado` (pendiente|confirmada|cancelada)
- `asistidaPorIA` (booleano)
- `createdAt`
- `updatedAt`

## Reglas de negocio
- No se permiten productos duplicados por nombre.
- Precio y stock no pueden ser negativos.
- No se puede reservar en fechas pasadas.
- No se puede reservar mas cantidad de la disponible en stock.
- No se permiten reservas duplicadas del mismo cliente, producto y fecha.

## Endpoints API

### Productos
- `POST   /api/v1/products`
- `GET    /api/v1/products?page=1&limit=10`
- `GET    /api/v1/products/:id`
- `PUT    /api/v1/products/:id`
- `DELETE /api/v1/products/:id`

### Reservas
- `POST   /api/v1/reserva/post`
- `GET    /api/v1/reserva/get/all?page=1&limit=10&estado=pendiente`
- `GET    /api/v1/reserva/get/:id`
- `PATCH  /api/v1/reserva/update/:id`
- `DELETE /api/v1/reserva/delete/:id`

### Utilidades
- `GET /api/v1/health`
- `GET /api/v1`

## Ejecucion local

### 1) Backend
```bash
npm --prefix backend install
npm --prefix backend run start
```

Opcional para seed manual:
```bash
npm --prefix backend run seed
```

URL local: `http://localhost:3000`

### 2) Frontend Angular
```bash
npm --prefix frontend-angular install
npm --prefix frontend-angular run start -- --port 4200
```

URL local: `http://localhost:4200`

### 3) Frontend React
```bash
npm --prefix frontend-react install
npm --prefix frontend-react run start -- --port 5173
```

URL local: `http://localhost:5173`

## Evidencias de cumplimiento (PDF)
- Arquitectura por capas en backend (`config`, `models`, `controllers`, `routes`, `middlewares`).
- CRUD completo en productos y reservas.
- Paginacion y filtro por estado en reservas.
- Validaciones y manejo de errores centralizado.
- Base de datos de prueba cargada automaticamente con minimo 20 reservas.
- Angular: servicios HTTP, formularios reactivos, loader, mensajes, CRUD, detalle, paginacion, filtros.
- React: componentes funcionales, hooks, formularios controlados, React Router, CRUD, detalle, paginacion, filtros.

## Capturas y docs
- Capturas en `docs/`.
- Guias de despliegue: `docs/deploy-api.md`, `docs/deploy-angular.md`, `docs/deploy-react.md`.
