import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutFacade } from './facades/layout.facade';
import { AuthDomainModule } from '@showtime/auth/domain';

@NgModule({
  imports: [CommonModule, AuthDomainModule],
  providers: [LayoutFacade],
})
export class LayoutAbstractModule {}
