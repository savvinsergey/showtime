import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthFacade } from './facades/auth.facade';
import { AuthDomainModule } from '@showtime/auth/domain';

@NgModule({
  imports: [CommonModule, AuthDomainModule],
  providers: [AuthFacade],
})
export class AuthAbstractModule {}
