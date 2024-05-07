import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthFacadeImplementation } from './facades/auth.facade';

import { AuthApplicationModule } from '@showtime/auth/application';
import { AuthFacade } from '@showtime/auth/ui/facade';

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
