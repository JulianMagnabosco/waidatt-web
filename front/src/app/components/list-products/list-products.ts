import { Component, signal } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-products',
  imports: [RouterLink],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {

  products = signal<Product[]>([
    new Product(1, 'Producto 1', 'Descripción del producto 1',"Indumentaria", 10.99),
    new Product(2, 'Producto 2', 'Descripción del producto 2',"Indumentaria", 19.99),
  ]);

  editProduct(arg0: number) {
    throw new Error('Method not implemented.');
  }
  
  deleteProduct(arg0: number) {
    throw new Error('Method not implemented.');
  }
}
