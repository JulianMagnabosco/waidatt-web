import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { AddImages } from '../add-images/add-images';
import { Carousel, CarouselSlide } from "../carousel/carousel";

@Component({
  selector: 'app-show-product',
  imports: [RouterLink, AddImages, Carousel],
  templateUrl: './show-product.html',
  styleUrl: './show-product.css',
})
export class ShowProduct implements OnInit {
  productsService = inject(ProductsService);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  product = signal<Product | undefined>(undefined);

  notFound = signal<boolean>(false);

  userAdmin = signal<boolean>(false);

  slides = signal<CarouselSlide[]>([]);

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!productId) return;
    this.productsService.getProduct(productId).subscribe({next: (data) => {
      this.product.set(data)
      this.slides.set((data.images ?? []).map((val, index) => {
        return { id: val.image_order, imageUrl: val.image, title: '' } as CarouselSlide
      }))
    },
    error: (err) => {
      this.notFound.set(true)
    },});

    this.userAdmin.set(this.userService.isLoggedIn())
  }

  deleteProduct(){
    if(confirm("Seguro que quiere eliminar el producto de forma PERMANENTE?")){
      this.productsService.deleteProduct(this.product()?.id||-1).subscribe({next: (data) => {
      alert("Producto eliminado")
      this.router.navigateByUrl("/");
    },
    error: (err) => {
      alert("Producto eliminado")
    },});
    }
  }
  
  editProduct(){
      this.router.navigateByUrl("/edit/"+this.product()?.id);
  }
}
