import { APP_INITIALIZER, NgModule } from '@angular/core';

import { authInitializer } from './utils/auth.initializer';

import { AuthApplicationModule } from '@showtime/auth/application';

@NgModule({
  imports: [AuthApplicationModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: authInitializer,
    },
  ],
})
export class InitializerModule {}
