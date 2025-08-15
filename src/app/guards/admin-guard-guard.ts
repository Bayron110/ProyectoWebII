import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('usuarioLogueado') === 'true';
  const rol = localStorage.getItem('usuarioRol');

  if (!isLoggedIn || rol !== 'ADMIN') {
    return router.parseUrl('/login');
  }

  return true;
};
