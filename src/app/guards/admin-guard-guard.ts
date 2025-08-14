import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('usuarioLogueado') === 'true';
  const rol = localStorage.getItem('usuarioRol');

  if (!isLoggedIn || rol !== 'ADMIN') {
    // Si no está logueado o no es admin, redirige al login
    return router.parseUrl('/login');
  }

  // Es admin y logueado, puede acceder a sus rutas hijas
  return true;
};
