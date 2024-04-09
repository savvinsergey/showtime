import { Route } from '@angular/router';
import { AuthGuard, authHttpInterceptorFn } from '@auth0/auth0-angular';

import { MainLayoutComponent } from '../../../../libs/layout/ui/src/lib/components/containers';
import { CheckRolesGuard } from '../../../../libs/auth/utils/src/lib/guards/check-roles.guard';
import { EUserRoles } from '../../../../libs/auth/shared/enums/user-roles.enum';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { usersAuthTokenInterceptor } from '../../../../libs/users/utils/src/lib/interceptors/users-token.interceptor';

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
