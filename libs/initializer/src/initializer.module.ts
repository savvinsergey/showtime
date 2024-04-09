import { APP_INITIALIZER, NgModule } from '@angular/core';
import { authInitializer } from './utils/auth.initializer';
import { AuthApplicationModule } from '../../auth/data/application/src';

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
