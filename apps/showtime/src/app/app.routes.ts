import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { MainLayoutComponent } from '../../../../libs/layout/ui/src/lib/components/containers';

import { EUserRoles } from '@showtime/auth/shared';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { usersAuthTokenInterceptor } from '../../../../libs/users/utils/src/lib/interceptors/users-token.interceptor';
import { CheckRolesGuard } from '@showtime/auth/utils';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('../../../../libs/users/ui/src/lib/components/pages/users/users.page').then(mod => mod.UsersPage),
        providers: [provideHttpClient(withInterceptors([usersAuthTokenInterceptor]))],
        canActivate: [AuthGuard, CheckRolesGuard],
        data: {
          roles: [EUserRoles.ADMIN],
        },
      },
      {
        path: 'user',
        loadComponent: () =>
          import('../../../../libs/users/ui/src/lib/components/pages/user/user.page').then(mod => mod.UserPage),
        providers: [provideHttpClient(withInterceptors([usersAuthTokenInterceptor]))],
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
