import { Component, inject, OnInit, signal } from '@angular/core';
import { TableProducts } from '../table-products/table-products';
import { Product } from '../../models/product';
import { form, FormField, FormRoot, maxLength } from '@angular/forms/signals';
import { ProductFilter, ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-catalog',
  imports: [TableProducts, FormField, FormRoot],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
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

  productService = inject(ProductsService);

  ngOnInit() {
    this.productService.search({}).subscribe({
      next: (response) => {
        this.search({});
      }
    });
  }

  searchModel = signal({
    name: '',
    type: '',
    order: ''
  });

  searchForm = form(this.searchModel,
    (schemaPath) => {
      maxLength(schemaPath.name, 100, { message: 'Name cannot exceed 100 characters' });
    }, {
    submission: {
      action: async (field) => {

        const filters: ProductFilter = {
          name: field().value().name,
          type: field().value().type ? parseInt(field().value().type) : undefined,
          order: field().value().order
        };

        const result = await this.search(filters);
        if (result.ok) return;
        return { kind: 'serverError', message: 'Failed to submit form' };
      },
    },
  },)

  search(values: ProductFilter): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      this.productService.search(values).subscribe({
        next: (response) => {
          console.log('Search successful:', response);

          this.products.set(response)

          resolve({ ok: true });
        },
        error: (error) => {
          console.error('Search failed:', error);
          resolve({ ok: false });
        }
      });
    });
  }

  resetForm() {
    this.searchModel.set({
      name: '',
      type: '',
      order: ''
    });
  }



}
