import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthAbstractModule } from '@showtime/auth/abstract';

import { AuthUtilsFacade } from '../../../abstract';
import { CheckAccessDirective } from './directives/check-roles.directive';

@NgModule({
  declarations: [CheckAccessDirective],
  imports: [CommonModule, AuthAbstractModule.forFeature({ provideTo: AuthUtilsFacade })],
  exports: [CheckAccessDirective],
})
export class AuthUtilsModule {}
