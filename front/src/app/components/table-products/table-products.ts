import { Component, input, signal } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-table-products',
  imports: [],
  templateUrl: './table-products.html',
  styleUrl: './table-products.css',
})
export class TableProducts {
  products = input<Product[]>([
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10.99 },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 19.99 },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 5.49 },
    { id: 4, name: 'Producto 4', description: 'Descripción del producto 4', price: 15.75 },
    { id: 5, name: 'Producto 5', description: 'Descripción del producto 5', price: 8.99 },
    { id: 6, name: 'Producto 6', description: 'Descripción del producto 6', price: 12.50 },
    { id: 7, name: 'Producto 7', description: 'Descripción del producto 7', price: 22.00 },
    { id: 8, name: 'Producto 8', description: 'Descripción del producto 8', price: 18.25 },
    { id: 9, name: 'Producto 9', description: 'Descripción del producto 9', price: 9.99 },
    { id: 10, name: 'Producto 10', description: 'Descripción del producto 10', price: 14.30 },
  ]);
}
