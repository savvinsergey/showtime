import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import {
  importProvidersFrom,
  makeEnvironmentProviders,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { AuthUtilsModule } from '@showtime/auth/utils';
import { InitializerModule } from '@showtime/initializer';
import { ENVIRONMENT } from '@showtime/shared/const';
import { usersAuthTokenInterceptor, UsersUtilsModule } from '@showtime/users/utils';

import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideEnvironment(),
    provideAuth0({
      domain: environment.auth0Auth.domain,
      clientId: environment.auth0Auth.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn, usersAuthTokenInterceptor])),
    importProvidersFrom(UsersUtilsModule, AuthUtilsModule, InitializerModule),
  ],
};

function provideEnvironment() {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ]);
}
