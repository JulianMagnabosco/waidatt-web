import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';

// TODO: !!!!PENDIENTE A ACTUALIZAR A ANGULAR 22
//  !!!!PENDIENTE A ACTUALIZAR A ANGULAR 22
// !!!!PENDIENTE A ACTUALIZAR A ANGULAR 22
//  !!!!PENDIENTE A ACTUALIZAR A ANGULAR 22

class CartItem extends Product {
  cartId: number = 1;
  quantity: number = 1;
}

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  // urlImage = environment.apiUrl + '/api/catalog/image/';
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(ProductsService);

  list = signal<CartItem[]>([]);

  changeDetector = inject(ChangeDetectorRef);

  pages = 22;
  elements = 21;
  elementsPerPage = 8;
  actualpage = 0;
  paginationDist = 2;

  liststocks =signal<number[]>([]);
  total: number = 0;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (value) => {
        this.actualpage = value['page'] || 0;
        this.search();
      },
    });
  }

  charge(page: number = 0) {
    this.actualpage = page;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.actualpage } as Params,
    });
  }

  search() {
    let data = {
      page: this.actualpage,
      size: this.elementsPerPage,
    };

    this.service.getCart(data).subscribe({
      next: (value) => {
        const elements = value['list'];
        
        // this.pages=value["pages"]

        this.total = 0;
        elements.forEach((element) => {
          this.searchItem(element);
        });
        console.log("listo",this.list());
        this.list.set(this.list());
      },
      error: (err) => {
        alert('Error inesperado en el servidor, revise su conexion a internet');
      },
    });
  }

  searchItem(element: any) {
    const quantity = element.quantity;
    this.liststocks.update((value) => [...value, quantity]);
    this.service.getProduct(element.id).subscribe({
      next: (value) => {
        let newItem = value as CartItem;
        // this.list()[index] = newItem;
        // this.list()[index].quantity = quantity;
        newItem.quantity = quantity;
        this.list.update((value) => [...value, newItem]);

        this.total += newItem.price * newItem.quantity;
        console.log("item",newItem.quantity ,this.total);
      },
      error: (err) => {
        console.log(err);
        alert('Error inesperado en el servidor, revise su conexion a internet');
      },
    });
  }

  update(index: number) {
    if (this.liststocks()[index] == null) {
      return;
    }
    let data = {
      id: this.list()[index].id,
      quantity: this.liststocks()[index],
    };
    this.service.editCart(data).subscribe({
      next: (value) => {
        if (this.liststocks()[index] <= 0) {
          // this.list.splice(index, 1);
          this.list.update((value) => {
            value.splice(index, 1);
            return value;
          });
          this.liststocks.update((value) => {
            value.splice(index, 1);
            return value;
          });
          // cAlert("success","Eliminado")
        } else {
          // this.list[index].quantity = this.liststocks[index];
          this.list.update((value) => {
            value[index].quantity = this.liststocks()[index];
            return value;
          });
          // cAlert("success","Añadido al carrito")
        }

        this.getTotal();
      },
      error: (err) => {
        alert('Error inesperado en el servidor, revise su conexion a internet');
      },
    });
  }
  notupdate(index: number) {
    this.liststocks.update((value) => {
      value[index] = this.list()[index].quantity;
      return value;
    });
  }
  remove(index: number) {
    this.liststocks.update((value) => {
      value[index] = 0;
      return value;
    });
    this.update(index);
    this.getTotal();
  }

  get buyUrl() {
    let items = '';
    let index = 0;
    this.list().forEach((c) => {
      items += `+${c.quantity}x+"${c.name}"+a+$${c.price * c.quantity}`;
      if (index != this.list.length - 1) {
        if (index != this.list.length - 2) {
          items += ',+';
        } else items += '+y+';
      }
      index++;
    });
    return `${environment.whatsappLink}?text=Hola+quisiera+comprar${items}`;
  }

  getTotal() {
    this.total = 0;
    this.list().forEach((element) => {
      this.total += element.price * element.quantity;
    });
  }
}
