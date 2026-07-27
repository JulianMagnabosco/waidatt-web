import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';

@Service()
export class ProductsService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    search(values: { name: string; type: string; order: string }) {
        return this.http.get(`${this.apiUrl}/products`, { params: values });
    }
}
