import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, FormRoot, max, maxLength, min, required } from '@angular/forms/signals';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  imports: [FormField, FormRoot],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {
  productService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  productModel = signal<Product>({
    id: 0,
    name: '',
    description: '',
    product_type: '',
    price: 0,
  });

  editMode = signal<boolean>(false);

  productForm = form(
    this.productModel,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Name needed' });
      required(schemaPath.description, { message: 'Description needed' });
      maxLength(schemaPath.name, 100, { message: 'Name cannot exceed 100 characters' });
      maxLength(schemaPath.description, 500, {
        message: 'Description cannot exceed 500 characters',
      });

      min(schemaPath.price, 1, { message: 'Precio minimo' });
    },
    {
      submission: {
        action: async (field) => {
          let result: { ok: boolean } | undefined;
          //decide si edit o nuevo
          if (this.editMode()) {
            result = await this.editProduct(field().value());
          } else {
            result = await this.addProduct(field().value());
          }
          
          if (result.ok) return;
          return { kind: 'serverError', message: 'Failed to submit form' };
        },
      },
    },
  );

  // CARGA EN CASO DE EDIT
  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!productId) return;
    this.productService.getProduct(productId).subscribe({
      next: (data) => {
        this.productModel.set(data);
        this.editMode.set(true);
      },
      error: (err) => {
        this.editMode.set(false);
      },
    });
  }

  //NUEVO
  addProduct(values: any): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      this.productService.addProduct(values).subscribe({
        next: (response) => {
          console.log('Save successful:', response);
          alert('Exito, se a guardado el producto');

          this.router.navigateByUrl('/product/' + response.id);

          resolve({ ok: true });
        },
        error: (error) => {
          console.error('Save failed:', error);
          resolve({ ok: false });
        },
      });
    });
  }

  //EDITAR
  editProduct(values: any): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      this.productService.modProduct(values).subscribe({
        next: (response) => {
          console.log('Save successful:', response);
          alert('Exito, se a guardado el producto');

          this.router.navigateByUrl('/product/' + response.id);

          resolve({ ok: true });
        },
        error: (error) => {
          console.error('Save failed:', error);
          resolve({ ok: false });
        },
      });
    });
  }
}
