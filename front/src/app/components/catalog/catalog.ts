import { Component, inject, OnInit, signal } from '@angular/core';
import { TableProducts } from '../table-products/table-products';
import { Product } from '../../models/product';
import { form, FormField, FormRoot, maxLength } from '@angular/forms/signals';
import { ProductFilter, ProductsService } from '../../services/products-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [TableProducts, FormField, FormRoot],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  products = signal<Product[]>([]);

  productService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    const data = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.search(params);
      },
    });
  }

  searchModel = signal({
    name: '',
    product_type: '',
    ordering: 'name',
  });

  searchForm = form(
    this.searchModel,
    (schemaPath) => {
      maxLength(schemaPath.name, 100, { message: 'Name cannot exceed 100 characters' });
    },
    {
      submission: {
        action: async (field) => {
          const filters: ProductFilter = {
            name: field().value().name,
            product_type: field().value().product_type,
            ordering: field().value().ordering,
          };

          const result = await this.search(filters);
          if (result.ok) return;
          return { kind: 'serverError', message: 'Failed to submit form' };
        },
      },
    },
  );

  search(values: ProductFilter): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      this.productService.search(values).subscribe({
        next: (response) => {
          console.log('Search successful:', response);

          this.products.set(response.results);

          resolve({ ok: true });
        },
        error: (error) => {
          console.error('Search failed:', error);
          resolve({ ok: false });
        },
      });
    });
  }

  resetForm() {
    this.searchModel.set({
      name: '',
      product_type: '',
      ordering: '',
    });
  }
}
