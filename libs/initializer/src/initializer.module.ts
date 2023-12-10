import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthDomainModule } from '@showtime/auth/domain';
import { authInitializer } from './utils/auth.initializer';

@NgModule({
  imports: [AuthDomainModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: authInitializer,
    },
  ],
})
export class InitializerModule {}
