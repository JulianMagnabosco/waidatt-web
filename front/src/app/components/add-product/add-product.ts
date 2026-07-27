import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, max, maxLength, min, required } from '@angular/forms/signals';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-add-product',
  imports: [FormField, FormRoot],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  productModel = signal({
    name: '',
    description: '',
    product_type: '',
    price: 0,
    imageUrl: '',
  });

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
          const result = await this.addProduct(field().value());
          if (result.ok) return;
          return { kind: 'serverError', message: 'Failed to submit form' };
        },
      },
    },
  );

  productService = inject(ProductsService);

  addProduct(values: any): Promise<{ ok: boolean }> {
    return new Promise((resolve) => {
      this.productService.addProduct(values).subscribe({
        next: (response) => {
          console.log('Save successful:', response);
          alert("Exito, se a guardado el producto")

          this.productModel.set({
            name: '',
            description: '',
            product_type: '',
            price: 0,
            imageUrl: '',
          });

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
