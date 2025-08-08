import { CanActivateChildFn } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  return localStorage.getItem('usuarioLogueado') === 'true';
};
