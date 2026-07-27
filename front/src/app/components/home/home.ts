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
