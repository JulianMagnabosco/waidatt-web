import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '../models/token-responce';

@Service()
export class UserService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  isLoggedIn = signal<boolean>(!!localStorage.getItem('access_token'));
  username = signal<string|null>(localStorage.getItem('username'));

  // login(data: { username: string; password: string }) {
  //     return this.http.post(`${this.apiUrl}/login`, data);
  // }
  login(data:{username: string, password: string}): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/token/`, data)
      .pipe(tap(res => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        localStorage.setItem('username', data.username);
        this.isLoggedIn.set(true);
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.isLoggedIn.set(false);
  }

}
