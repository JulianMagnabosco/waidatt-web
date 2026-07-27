import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Catalog } from './components/catalog/catalog';
import { ListProducts } from './components/list-products/list-products';
import { Login } from './components/login/login';

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
    path: 'login',
    component: Login
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
