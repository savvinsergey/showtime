import { provideHttpClient, withRequestsMadeViaParent } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import type { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { EUserRoles } from '@showtime/auth/shared';
import { CheckRolesGuard } from '@showtime/auth/utils';
import { UsersAbstractModule } from '@showtime/users/abstract';
import { UsersUiFacade } from '@showtime/users/ui/abstract';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideHttpClient(withRequestsMadeViaParent()),
      importProvidersFrom(UsersAbstractModule.forFeature({ provideTo: UsersUiFacade })),
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('@showtime/users/ui').then(module_ => module_.UsersPage),
        canActivate: [AuthGuard, CheckRolesGuard],
        data: {
          roles: [EUserRoles.ADMIN],
        },
      },
      {
        path: 'settings',
        loadComponent: () => import('@showtime/users/ui').then(module_ => module_.UserPage),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
