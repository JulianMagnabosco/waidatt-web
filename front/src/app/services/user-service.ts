import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '../models/token-responce';

@Service()
export class UserService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  // login(data: { username: string; password: string }) {
  //     return this.http.post(`${this.apiUrl}/login`, data);
  // }
  login(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/token/`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

}
