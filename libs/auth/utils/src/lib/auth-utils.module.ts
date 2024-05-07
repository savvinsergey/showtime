import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckAccessDirective } from './directives/check-roles.directive';

import { AuthAbstractModule } from '@showtime/auth/abstract';

@NgModule({
  declarations: [CheckAccessDirective],
  imports: [CommonModule, AuthAbstractModule],
  exports: [CheckAccessDirective],
})
export class AuthUtilsModule {}
