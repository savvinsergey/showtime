import { provideHttpClient, withRequestsMadeViaParent } from '@angular/common/http';
import type { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { EUserRoles } from '@showtime/auth/shared';
import { CheckRolesGuard } from '@showtime/auth/utils';
import { MainLayoutComponent } from '@showtime/layout/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'users',
        loadComponent: () => import('@showtime/users/ui').then(module_ => module_.UsersPage),
        providers: [provideHttpClient(withRequestsMadeViaParent())],
        canActivate: [AuthGuard, CheckRolesGuard],
        data: {
          roles: [EUserRoles.ADMIN],
        },
      },
      {
        path: 'user',
        loadComponent: () => import('@showtime/users/ui').then(module_ => module_.UserPage),
        providers: [provideHttpClient(withRequestsMadeViaParent())],
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
