import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('usuarioLogueado') === 'true';

  if (isLoggedIn) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
