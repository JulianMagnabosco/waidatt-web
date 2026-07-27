import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

export interface ProductFilter {
  name?: string;
  product_type?: string;
  ordering?: string;
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
    return this.http.get<Product[]>(`${this.apiUrl}/products/`, { params: params });
  }

  getProduct(id:string|number){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  addProduct(data:any){
    return this.http.post<Product>(`${this.apiUrl}/products/`, data);
  }
}
