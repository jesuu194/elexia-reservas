
	import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
	},
	{
		path: 'productos',
		loadComponent: () => import('./pages/products/list/list').then(m => m.List)
	},
	{
		path: 'productos/nuevo',
		loadComponent: () => import('./pages/products/form/form').then(m => m.Form)
	},
	{
		path: 'productos/:id/editar',
		loadComponent: () => import('./pages/products/form/form').then(m => m.Form)
	},
	{
		path: 'productos/:id',
		loadComponent: () => import('./pages/products/detail/detail').then(m => m.Detail)
	},
	{
		path: 'reservas',
		loadComponent: () => import('./pages/reservas/list/list').then(m => m.List)
	},
	{
		path: 'reservas/nueva',
		loadComponent: () => import('./pages/reservas/form/form').then(m => m.Form)
	},
	{
		path: 'reservas/:id/editar',
		loadComponent: () => import('./pages/reservas/form/form').then(m => m.Form)
	},
	{
		path: 'reservas/:id',
		loadComponent: () => import('./pages/reservas/detail/detail').then(m => m.Detail)
	}
];
