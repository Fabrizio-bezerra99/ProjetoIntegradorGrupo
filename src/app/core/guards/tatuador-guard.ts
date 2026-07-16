import { CanActivateFn } from '@angular/router';

export const tatuadorGuard: CanActivateFn = (route, state) => {
  return true;
};
