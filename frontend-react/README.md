# Frontend React - Elexia Reservas IA

Cliente React que consume la misma API del backend definida para la fase de Angular.

## Stack
- React + Vite
- React Router
- Hooks (`useState`, `useEffect`)
- Bootstrap

## Funcionalidades
- CRUD completo de productos
- CRUD completo de reservas
- Vista de detalle por ID
- Paginacion en listados
- Filtro por estado en reservas
- Formularios controlados con validaciones
- Mensajes de error y exito

## Configuracion
Por defecto, consume: `http://localhost:3000/api/v1`

Si necesitas otra URL, define:
```bash
VITE_API_URL=http://tu-api/api/v1
```

## Comandos
```bash
npm install
npm run start -- --port 5173
```

Build:
```bash
npm run build
```

## Rutas principales
- `/`
- `/productos`
- `/productos/nuevo`
- `/productos/:id`
- `/productos/:id/editar`
- `/reservas`
- `/reservas/nueva`
- `/reservas/:id`
- `/reservas/:id/editar`
