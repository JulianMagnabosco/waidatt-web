import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { ImageProduct, Product } from '../models/product';
import { of } from 'rxjs';

export interface ProductFilter {
  name?: string;
  product_type?: string;
  ordering?: string;
  page?: number;
}
export interface ProductPage {
  count: number;
  next: any;
  previus: any;
  results: Product[];
}
@Service()
export class ProductsService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  search(filters: ProductFilter) {
    let params = new HttpParams();

    if (filters.name) {
      params = params.set('search', filters.name);
    }
    if (filters.product_type) {
      params = params.set('product_type', filters.product_type);
    }
    if (filters.ordering) {
      params = params.set('ordering', filters.ordering);
    }
    if (filters.page) {
      params = params.set('page', filters.page);
    }
    return this.http.get<ProductPage>(`${this.apiUrl}/products/`, { params: params });
  }

  getProduct(id:string|number){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  addProduct(data:any){
    return this.http.post<Product>(`${this.apiUrl}/products/`, data);
  }
  
  modProduct(data:any){
    return this.http.put<Product>(`${this.apiUrl}/products/${data.id}/`, data);
  }
  
  deleteProduct(id:string|number){
    return this.http.delete(`${this.apiUrl}/products/${id}/`);
  }

  //CART
  
  cart(){
    try {
      return JSON.parse( localStorage.getItem("data.cart") || "");
    }catch (e) {
      return []
    }
  }
  getCart(data:any){
    let cartList:any[] =this.cart()
    return of({list:cartList,elements:cartList.length,pages:1})
  }
  addCart(data:any){
    let cartList:any[] =this.cart()
    let found=false

    for(let element of cartList){
      if(element.id==data.id) return of("ok");
    }
    cartList.push(data);
    localStorage.setItem("data.cart",JSON.stringify(cartList));
    return of("ok")
  }
  editCart(data:any){
    let cartList:any[] =this.cart()
    cartList.forEach((element, index) => {
      if(element.id!=data.id) return;
      if(data.quantity==0) cartList.splice(index,1);
      element.quantity=data.quantity
    });
    localStorage.setItem("data.cart",JSON.stringify(cartList));
    return of("ok")
  }

  //IMAGENES
  subirImagen(productoId: number, archivo: File) {
    const formData = new FormData();
    formData.append('image', archivo);
    return this.http.post<ImageProduct>(`${this.apiUrl}/products/${productoId}/add_image/`, formData);
  }

  eliminarImagen(productoId: number, imagenId: number){
    return this.http.delete<void>(`${this.apiUrl}/products/${productoId}/images/${imagenId}/`);
  }
}
