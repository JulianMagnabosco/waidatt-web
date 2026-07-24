import { CanActivateFn } from '@angular/router';

export const allowGuard: CanActivateFn = (route, state) => {
  return true;
};
