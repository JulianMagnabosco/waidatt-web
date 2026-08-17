import { Component, inject, OnInit, signal } from '@angular/core';
import { TableProducts } from '../table-products/table-products';
import { Product } from '../../models/product';
import { form, FormField, FormRoot, maxLength, submit } from '@angular/forms/signals';
import { ProductFilter, ProductsService } from '../../services/products-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-catalog',
  imports: [TableProducts, FormField, FormRoot],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  products = signal<Product[]>([]);
  productTypes = environment.product_types;

  productService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  canNextPage = signal<boolean>(false);

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.search(params);
      },
    });
  }

  searchModel = signal({
    name: '',
    product_type: '',
    ordering: 'name',
    page: 1,
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
            page: field().value().page,
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
          this.canNextPage.set(!!response.next);

          resolve({ ok: true });
        },
        error: (error) => {
          console.error('Search failed:', error);
          resolve({ ok: false });
        },
      });
    });
  }

  nextPage() {
    if (!this.canNextPage()) return;
    this.searchModel.update((valueOld) => {
      return {
        name: valueOld.name,
        product_type: valueOld.product_type,
        ordering: valueOld.ordering,
        page: valueOld.page + 1,
      };
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.searchModel(),
      queryParamsHandling: 'merge', // opcional: mergea con los params existentes
    });
  }

  prevPage() {
    if (this.searchModel().page <= 1) return;

    this.searchModel.update((valueOld) => {
      return {
        name: valueOld.name,
        product_type: valueOld.product_type,
        ordering: valueOld.ordering,
        page: valueOld.page - 1,
      };
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.searchModel(),
      queryParamsHandling: 'merge', // opcional: mergea con los params existentes
    });
  }

  resetForm() {
    this.searchModel.set({
      name: '',
      product_type: '',
      ordering: '-name',
      page: 1,
    });
  }

  addCart(id: number) {
    let data = {
      id: id,
      quantity: 1,
    };
    this.productService.addCart(data).subscribe({
        next: (value) => {
          alert( 'Añadido al carrito');
          // alert("Añadido al carrito");
        },
        error: (err) => {
          // alert("Hubo un error al añadir al carrito");
          if (err.status == 403 || err.status == 401) {
            return;
          }
          alert( 
            'Error inesperado en el servidor, revise su conexion a internet'
          );
        },
      })
  }
}
