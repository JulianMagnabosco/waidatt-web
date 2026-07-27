import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-product',
  imports: [RouterLink],
  templateUrl: './show-product.html',
  styleUrl: './show-product.css',
})
export class ShowProduct implements OnInit {
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  product = signal<Product | undefined>(undefined);

  notFound = signal<boolean>(false);

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!productId) return;
    this.productsService.getProduct(productId).subscribe({next: (data) => {
      this.product.set(data)
    },
    error: (err) => {
      this.notFound.set(true)
    },});
  }
}
