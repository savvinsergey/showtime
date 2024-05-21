import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthApplicationModule } from '@showtime/auth/application';

import { authInitializer } from './utils/auth.initializer';

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
