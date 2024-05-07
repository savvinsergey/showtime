import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ILayoutUiModuleConfig, LayoutUiModule } from '@showtime/layout/ui';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InitializerModule } from '@showtime/initializer';
import { ENVIRONMENT } from '@showtime/shared/const';
import { environment } from '../environments/environment';
import { usersAuthTokenInterceptor } from '../../../../libs/users/utils/src/lib/interceptors/users-token.interceptor';
import { UsersUtilsModule } from '@showtime/users/utils';
import { EUserRoles } from '@showtime/auth/shared';

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
