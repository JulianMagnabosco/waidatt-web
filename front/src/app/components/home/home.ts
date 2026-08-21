import { Component, inject, OnInit, signal } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { TableProducts } from '../table-products/table-products';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';
import { ProductsService } from '../../services/products-service';
import { RouterLink } from '@angular/router';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Carousel, TableProducts, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  whatsappNumber = environment.whatsappNumber;
  whatsappLink =
    environment.whatsappLink +
    '?text=Hola!%20Estoy%20interesado%20en%20sus%20productos.%20Quisiera%20saber%20más%20información.';

  slides = [
    { id: 1, imageUrl: 'panel.png', title: '' },
    { id: 2, imageUrl: 'panel2.png', title: '' },
    { id: 3, imageUrl: 'panel3.png', title: '' },
  ];

  sections = [
    { id: 1, iconUrl: 'icono1.svg', content: 'INDUMENTARIA' },
    { id: 2, iconUrl: 'icono2.svg', content: 'CALZADO' },
    { id: 3, iconUrl: 'icono3.svg', content: 'ELEMENTOS DE \n SEGURIDAD' },
  ];

  products = signal<Product[]>([]);

  productsService = inject(ProductsService);

  ngOnInit() {
    // this.productsService.search({ordering:"name",product_type:"remeras"}).subscribe({
    //   next: (response) => {
    //     this.products.set(response.results);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching products:', error);
    //   }
    // });
    // const list_pts=[
    //   "remeras",
    //   "camperas",
    //   "chalecos",
    //   "pantalones",
    //   "calzado",
    // ]
    // for(let pt of list_pts ) {
    //   this.addMore(pt);
    // }
    this.products.set([]); // arrancamos vacío
    const list_pts = ['remeras', 'camperas', 'chalecos', 'pantalones', 'calzado'];

    from(list_pts)
      .pipe(
        concatMap((product_type) =>
          this.productsService.search({ ordering: 'name', product_type }),
        ),
      )
      .subscribe({
        next: (response) => {
          this.products.update((current) => [...current, ...response.results]);
          this.products.update((current) => current.slice(0, 12)); // Limitar a los primeros 12 productos
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  addCart(id: number) {
    let data = {
      id: id,
      quantity: 1,
    };
    this.productsService.addCart(data).subscribe({
      next: (value) => {
        alert('Añadido al carrito');
        // alert("Añadido al carrito");
      },
      error: (err) => {
        // alert("Hubo un error al añadir al carrito");
        if (err.status == 403 || err.status == 401) {
          return;
        }
        alert('Error inesperado en el servidor, revise su conexion a internet');
      },
    });
  }
}
