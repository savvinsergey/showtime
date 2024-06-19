import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthApplicationModule } from '@showtime/auth/application';
import { UsersApplicationModule } from '@showtime/users/application';

import { authInitializer } from './utils/auth.initializer';

@NgModule({
  imports: [AuthApplicationModule, UsersApplicationModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: authInitializer,
    },
  ],
})
export class InitializerModule {}
