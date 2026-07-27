import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

export interface ProductFilter {
  name?: string;
  type?: number;
  order?: string;
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
    if (filters.type) {
      params = params.set('type', filters.type.toString());
    }
    if (filters.order) {
      params = params.set('order', filters.order);
    }
        return this.http.get<Product[]>(`${this.apiUrl}/products`, { params: params });
    }
}
