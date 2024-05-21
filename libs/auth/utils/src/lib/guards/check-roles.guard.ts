import 'reflect-metadata';

import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthFacade } from '@showtime/auth/ui/facade';
import { tap } from 'rxjs';

import { checkRoles } from '../operators/check-roles.operator';

export const CheckRolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  // ------------------ //

  const allowedRoles = route.data?.['roles'] as string[];

  if (!allowedRoles) {
    console.error('Please specify user roles to check on route');
    return false;
  }

  return authFacade.state.user$!.pipe(
    checkRoles(allowedRoles),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate(['/']);
      }
    }),
  );
};
