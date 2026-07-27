import { Component, inject, OnInit, signal } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { TableProducts } from '../table-products/table-products';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment.development';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-home',
  imports: [Carousel, TableProducts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  whatsappNumber = environment.whatsappNumber;
  whatsappLink = environment.whatsappLink + "?text=Hola!%20Estoy%20interesado%20en%20sus%20productos.%20Quisiera%20saber%20más%20información.";

  slides = [
    { id: 1, imageUrl: 'Captura3.png', title: '' },
    { id: 2, imageUrl: 'Captura2.png', title: '' },
    { id: 3, imageUrl: 'Captura1.png', title: '' },
  ];

  sections = [
    { id: 1, iconUrl: 'icono1.svg', content: 'INDUMENTARIA' },
    { id: 2, iconUrl: 'icono2.svg', content: 'CALZADO' },
    { id: 3, iconUrl: 'icono3.svg', content: 'ELEMENTOS DE \n SEGURIDAD' },
  ];

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
  
  productsService = inject(ProductsService);
  
  ngOnInit() {
    this.productsService.search({}).subscribe({
      next: (response) => {
        this.products.set(response);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}
