import { Routes } from '@angular/router';
import { Home } from './components/home/home';
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
    path: 'list',
    component: ListProducts
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
