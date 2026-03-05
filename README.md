# Proyecto Final Integrador - Elexia Reservas IA

Aplicacion full-stack para automatizar reservas con IA para distintos negocios (restaurantes, clinicas, gimnasios, centros de belleza, academias y consultorias), con API unica y dos clientes frontend completos.

## Stack tecnologico
- Backend: `Node.js`, `Express`, `MongoDB Atlas`, `Mongoose`
- Frontend 1: `Angular` (standalone + servicios HTTP + formularios reactivos)
- Frontend 2: `React` (componentes funcionales + hooks + React Router)
- UI: `Bootstrap`

## URLs en produccion
- API: `https://backend-mu-mauve-33.vercel.app`
- Angular: `https://frontend-angular-mocha.vercel.app`
- React: `https://frontend-react-ebon.vercel.app`

## Problema que resuelve
Los negocios que ofrecen atencion digital necesitan controlar su catalogo de servicios y gestionar reservas de forma centralizada. Elexia Reservas IA permite:
- Gestionar productos/servicios con stock y disponibilidad.
- Registrar y filtrar reservas por estado.
- Aplicar reglas de negocio reales para evitar errores operativos.
- Operar con dos frontends distintos sobre una misma API.

## Arquitectura
```mermaid
flowchart LR
	A[Frontend Angular] --> C[API Express Node]
	B[Frontend React] --> C
	C --> D[Controllers]
	D --> E[Models Mongoose]
	E --> F[(MongoDB Atlas)]
	C --> G[Middlewares de errores]
```

## Flujo principal de reserva
```mermaid
sequenceDiagram
	participant U as Usuario
	participant FE as Frontend (Angular/React)
	participant API as API Express
	participant DB as MongoDB Atlas

	U->>FE: Completa formulario de reserva
	FE->>API: POST /api/v1/reserva/post
	API->>API: Valida reglas de negocio
	API->>DB: Comprueba producto y stock
	DB-->>API: Datos del producto
	API->>DB: Guarda reserva y actualiza stock
	DB-->>API: Reserva creada
	API-->>FE: 201 + reserva serializada
	FE-->>U: Mensaje de exito
```

## Entidades
### Product
- `_id`
- `nombre`
- `descripcion`
- `precio` (number)
- `stock` (number)
- `fechaPublicacion` (date)
- `disponible` (boolean)
- `createdAt`
- `updatedAt`

### Reserva
- `_id`
- `nombreCliente`
- `descripcion`
- `producto` (ObjectId ref Product)
- `cantidad` (number)
- `fecha` (date)
- `estado` (`pendiente|confirmada|cancelada`)
- `asistidaPorIA` (boolean)
- `createdAt`
- `updatedAt`

## Reglas de negocio implementadas
- No se permiten productos duplicados por nombre.
- Precio y stock no pueden ser negativos.
- No se puede reservar en fechas pasadas.
- No se puede reservar mas cantidad que el stock disponible.
- No se permiten reservas duplicadas del mismo cliente, producto y fecha.

## API REST (documentada)
### Utilidades
- `GET /api/v1`
- `GET /api/v1/health`

### Productos
- `POST /api/v1/products`
- `GET /api/v1/products?page=1&limit=10`
- `GET /api/v1/products/:id`
- `PUT /api/v1/products/:id`
- `DELETE /api/v1/products/:id`

### Reservas
- `POST /api/v1/reserva/post`
- `GET /api/v1/reserva/get/all?page=1&limit=10&estado=pendiente`
- `GET /api/v1/reserva/get/:id`
- `PATCH /api/v1/reserva/update/:id`
- `DELETE /api/v1/reserva/delete/:id`

## Ejecucion local
### 1) Backend
```bash
npm --prefix backend install
npm --prefix backend run start
```
URL: `http://localhost:3000`

Opcional (seed manual):
```bash
npm --prefix backend run seed
```

### 2) Frontend Angular
```bash
npm --prefix frontend-angular install
npm --prefix frontend-angular run start -- --port 4200
```
URL: `http://localhost:4200`

### 3) Frontend React
```bash
npm --prefix frontend-react install
npm --prefix frontend-react run start -- --port 5173
```
URL: `http://localhost:5173`

## Cumplimiento de rubricas
- Backend por capas (`config`, `models`, `controllers`, `routes`, `middlewares`).
- CRUD completo en productos y reservas.
- Paginacion + filtros.
- Validaciones + manejo de errores y status codes.
- MongoDB Atlas con Mongoose (timestamps y relaciones).
- Angular con servicios HTTP, formularios reactivos, validaciones, mensajes y navegacion completa.
- React con componentes, hooks, consumo API, validaciones, router y estado bien organizado.
- Deploy estable de API + Angular + React en Vercel.

## Demo rapida para defensa
1. Abrir Angular y React en produccion.
2. Listar productos y reservas en ambos frontends.
3. Crear, editar y borrar un producto.
4. Crear, editar y borrar una reserva.
5. Mostrar `GET /api/v1/health` y documentacion del README.

## Documentacion adicional
- `docs/deploy-api.md`
- `docs/deploy-angular.md`
- `docs/deploy-react.md`
- `docs/rubrica-checklist.md`
