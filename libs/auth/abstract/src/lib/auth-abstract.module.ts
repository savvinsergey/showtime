import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthApplicationModule } from '@showtime/auth/application';
import { AuthFacade } from '@showtime/auth/ui/facade';

import { AuthFacadeImplementation } from './facades/auth.facade';

@NgModule({
  imports: [CommonModule, AuthApplicationModule],
  providers: [
    {
      provide: AuthFacade,
      useClass: AuthFacadeImplementation,
    },
  ],
})
export class AuthAbstractModule {}
