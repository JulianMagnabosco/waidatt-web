import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Catalog } from './components/catalog/catalog';
import { ListProducts } from './components/list-products/list-products';
import { Login } from './components/login/login';
import { AddProduct } from './components/add-product/add-product';
import { ShowProduct } from './components/show-product/show-product';

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
    path: 'list',
    component: ListProducts
  },
  {
    path: 'product/:id',
    component: ShowProduct
  },
  {
    path: 'add',
    component: AddProduct
  },
  {
    path: 'edit/:id',
    component: AddProduct
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
