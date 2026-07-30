import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from "@angular/router";
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-table-products',
  imports: [RouterLink],
  templateUrl: './table-products.html',
  styleUrl: './table-products.css',
})
export class TableProducts {
  products = input<Product[]>([
    {
      id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10.99,
      product_type: ''
    },
    {
      id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 19.99,
      product_type: ''
    },
    {
      id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 5.49,
      product_type: ''
    },
    {
      id: 4, name: 'Producto 4', description: 'Descripción del producto 4', price: 15.75,
      product_type: ''
    },
    {
      id: 5, name: 'Producto 5', description: 'Descripción del producto 5', price: 8.99,
      product_type: ''
    },
    {
      id: 6, name: 'Producto 6', description: 'Descripción del producto 6', price: 12.50,
      product_type: ''
    },
    {
      id: 7, name: 'Producto 7', description: 'Descripción del producto 7', price: 22.00,
      product_type: ''
    },
    {
      id: 8, name: 'Producto 8', description: 'Descripción del producto 8', price: 18.25,
      product_type: ''
    },
    {
      id: 9, name: 'Producto 9', description: 'Descripción del producto 9', price: 9.99,
      product_type: ''
    },
    {
      id: 10, name: 'Producto 10', description: 'Descripción del producto 10', price: 14.30,
      product_type: ''
    },
  ]);
  
  
  addCartEvent = output<number>();
}
