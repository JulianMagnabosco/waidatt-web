import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Catalog } from './components/catalog/catalog';
import { ListProducts } from './components/list-products/list-products';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'catalog',
    component: Catalog
  },
  {
    path: 'list-products',
    component: ListProducts
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
