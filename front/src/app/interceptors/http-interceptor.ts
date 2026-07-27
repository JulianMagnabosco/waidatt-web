import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../services/user-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(UserService);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo actuamos si el usuario estaba logueado y el token falló
      if (error.status === 401 && auth.isLoggedIn()) {
        auth.logout();
        alert('Tu sesión expiró. Por favor, iniciá sesión nuevamente.');
        router.navigate(['/']); // volver al inicio
      }
      return throwError(() => error);
    })
  );
};