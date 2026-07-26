import { Component, signal } from '@angular/core';
import { TableProducts } from '../table-products/table-products';
import { Product } from '../../models/product';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-catalog',
  imports: [TableProducts, FormField],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  products = signal<Product[]>([
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10.99, imageUrl: 'not-found.png' },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 19.99, imageUrl: 'not-found.png' },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 5.49, imageUrl: 'not-found.png' },
    { id: 4, name: 'Producto 4', description: 'Descripción del producto 4', price: 15.75, imageUrl: 'not-found.png' },
    { id: 5, name: 'Producto 5', description: 'Descripción del producto 5', price: 8.99, imageUrl: 'not-found.png' },
    { id: 6, name: 'Producto 6', description: 'Descripción del producto 6', price: 12.50, imageUrl: 'not-found.png' },
    { id: 7, name: 'Producto 7', description: 'Descripción del producto 7', price: 22.00, imageUrl: 'not-found.png' },
    { id: 8, name: 'Producto 8', description: 'Descripción del producto 8', price: 18.25, imageUrl: 'not-found.png' },
  ]);

  searchModel = signal({
    email: ''
  });

  searchForm = form(this.searchModel)

}
