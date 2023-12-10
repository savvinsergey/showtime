import 'reflect-metadata';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from '@showtime/auth/abstract';
import { checkRoles } from '../operators/check-roles.operator';

export const CheckRolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authFacade = inject(AuthFacade);
  const allowedRoles = route.data?.['roles'] as Array<string>;

  if (!allowedRoles) {
    console.error('Please specify user roles to check on route');
    return false;
  }

  return authFacade.state['user'].value$.pipe(checkRoles(allowedRoles));
};
