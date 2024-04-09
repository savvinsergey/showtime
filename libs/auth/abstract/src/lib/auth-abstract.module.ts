import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthFacadeImplementation } from './facades/auth.facade';
import { AuthApplicationModule } from '../../../data/application/src';
import { AuthFacade } from '../../../ui/src/lib/facades/auth.facade';

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
