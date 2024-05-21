import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { EUserRoles } from '@showtime/auth/shared';
import { InitializerModule } from '@showtime/initializer';
import type { ILayoutUiModuleConfig } from '@showtime/layout/ui';
import { LayoutUiModule } from '@showtime/layout/ui';
import { ENVIRONMENT } from '@showtime/shared/const';
import { usersAuthTokenInterceptor, UsersUtilsModule } from '@showtime/users/utils';

import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAuth0({
      domain: 'dev-6s6ql31bx0quuukb.us.auth0.com',
      clientId: 'bk9u5bncy47cSDQLuHXiY7nOJ1EYxxPn',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn, usersAuthTokenInterceptor])),
    importProvidersFrom(
      UsersUtilsModule,
      InitializerModule,
      LayoutUiModule.forRoot({
        title: 'Showtime',
        menu: [
          {
            text: 'Events',
            link: '/events',
            icon: 'ticket.svg',
          },
          {
            text: 'Places',
            link: '/places',
            icon: 'building.svg',
          },
          {
            text: 'Calendar',
            link: '/calendar',
            icon: 'calendar.svg',
          },
          {
            text: 'Users',
            link: '/users',
            icon: 'users.svg',
            roles: [EUserRoles.ADMIN],
          },
        ],
      } as ILayoutUiModuleConfig),
    ),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
};
