import 'reflect-metadata';

import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthUtilsFacade } from '@showtime/auth/utils/abstract';
import { tap } from 'rxjs';

import { checkRoles } from '../operators/check-roles.operator';

export const CheckRolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authUtilsFacade = inject(AuthUtilsFacade);
  const router = inject(Router);

  // ------------------ //

  const allowedRoles = route.data?.['roles'] as string[];

  if (!allowedRoles) {
    console.error('Please specify user roles to check on route');
    return false;
  }

  return authUtilsFacade.state.user$!.pipe(
    checkRoles(allowedRoles),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate(['/']);
      }
    }),
  );
};
