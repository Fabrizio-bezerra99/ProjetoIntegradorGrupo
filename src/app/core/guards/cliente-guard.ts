import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const clienteGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const perfil = authService.usuarioAtual()?.perfil;

  return perfil === 'cliente' || perfil === 'admin'
    ? true
    : router.createUrlTree(['/login'], {
        queryParams: { redirect: state.url },
      });
};
