import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const tatuadorGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.usuarioAtual()?.perfil === 'tatuador'
    ? true
    : router.createUrlTree(['/login']);
};
