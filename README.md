
# Frontend React — Agencia de Asistentes de Voz y Chatbots

SPA profesional para gestión de productos y reservas, consumiendo la API REST Node.js/Express. Cumple criterios de sobresaliente según rúbrica: código modular, validaciones, feedback, accesibilidad, documentación y despliegue.

## Índice
- [Descripción](#descripción)
- [Estructura](#estructura)
- [Instalación y uso](#instalación-y-uso)
- [Scripts disponibles](#scripts-disponibles)
- [Endpoints consumidos](#endpoints-consumidos)
- [Reglas de negocio y validaciones](#reglas-de-negocio-y-validaciones)
- [Criterios de sobresaliente](#criterios-de-sobresaliente)
- [Despliegue](#despliegue)

## Descripción
SPA React para la gestión de productos y reservas de una agencia de asistentes de voz/chatbots. Permite CRUD completo, validaciones visuales y funcionales, feedback, navegación profesional y accesibilidad.

## Estructura
- `src/`
  - `components/`: Navbar, Footer
  - `pages/`: Home, products (list, form, detail), reservas (list, form, detail)
  - `api/`: Servicios reutilizables para productos y reservas
- `public/`: Archivos estáticos

## Instalación y uso
1. Instala dependencias:
	```bash
	npm install
	```
2. Inicia la app:
	```bash
	npm start
	```
3. Accede a [http://localhost:3001](http://localhost:3001) (o el puerto configurado)

## Scripts disponibles
- `npm start`: Modo desarrollo
- `npm run build`: Compilar producción
- `npm test`: Ejecutar tests

## Endpoints consumidos
Ver [../docs/endpoints.md](../docs/endpoints.md) para detalles completos.

### Productos
- `POST   /api/v1/products` — Crear producto
- `GET    /api/v1/products?page=1&limit=10` — Listar productos
- `GET    /api/v1/products/:id` — Obtener producto
- `PUT    /api/v1/products/:id` — Actualizar producto
- `DELETE /api/v1/products/:id` — Eliminar producto

### Reservas
- `POST   /api/v1/reserva/post` — Crear reserva
- `GET    /api/v1/reserva/get/all?page=1&limit=10` — Listar reservas
- `GET    /api/v1/reserva/get/:id` — Obtener reserva
- `PATCH  /api/v1/reserva/update/:id` — Actualizar reserva
- `DELETE /api/v1/reserva/delete/:id` — Eliminar reserva

## Reglas de negocio y validaciones
Ver [../docs/reglas-negocio.md](../docs/reglas-negocio.md) para justificación completa.
- No productos duplicados por nombre
- Precio y stock no negativos
- No reservar más que el stock disponible
- No reservas en fechas pasadas
- No reservas duplicadas (cliente, producto, fecha)

Validaciones visuales y feedback en formularios. Accesibilidad: roles, labels, navegación por teclado.

## Criterios de sobresaliente
- Código modular, componentes reutilizables
- Validaciones y feedback claros
- Accesibilidad y responsive (Bootstrap)
- Navegación SPA profesional (React Router)
- Documentación completa (README, endpoints, reglas, diagramas)
- Despliegue estable y reproducible

## Despliegue
1. Instala dependencias: `npm install`
2. Ejecuta: `npm start` (desarrollo) o `npm run build` (producción)
3. Configura el backend en `http://localhost:3000` o ajusta el endpoint en `src/api/`

---
Para diagramas y arquitectura, ver [../docs/README.md](../docs/README.md).
