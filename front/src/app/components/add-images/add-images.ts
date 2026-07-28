import { Component, input, signal } from '@angular/core';
import { ImageProduct } from '../../models/product';
import { ProductsService } from '../../services/products-service';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-add-images',
  imports: [],
  templateUrl: './add-images.html',
  styleUrl: './add-images.css',
})
export class AddImages {

  productId = input<number>();
  images = signal<ImageProduct[]>([]);
  uploading = signal<boolean>(false);
  error = signal<string>('');

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.productsService.getProduct(this.productId()||0).subscribe(p => {
      this.images.set(p.images || []);
    });
  }

  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;

    this.error.set('');
    this.uploading.set(true);

    this.productsService.subirImagen(this.productId()||0, archivo).subscribe({
      next: (nuevaImagen) => {
        this.images.update(currentItems => [...currentItems, nuevaImagen]);
        this.uploading.set(false);
        input.value = ''; // limpia el input para poder resubir
      },
      error: (err) => {
        this.error = err.error?.detail || 'Error al subir la imagen';
        this.uploading.set(false);
      }
    });
  }

  eliminar(imagenId: number) {
    this.productsService.eliminarImagen(this.productId()||0, imagenId).subscribe(() => {
      this.images.update((value)=> value.filter(i => i.id !== imagenId));
    });
  }
}
