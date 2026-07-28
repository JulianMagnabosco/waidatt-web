import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const allowGuard: CanActivateFn = (route, state) => {
  const auth = inject(UserService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
};
