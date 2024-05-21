import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthApplicationModule } from '@showtime/auth/application';
import { LayoutFacade } from '@showtime/layout/ui';

import { LayoutFacadeImplementation } from './facades/layout.facade';

@NgModule({
  imports: [CommonModule, AuthApplicationModule],
  providers: [
    {
      provide: LayoutFacade,
      useClass: LayoutFacadeImplementation,
    },
  ],
})
export class LayoutAbstractModule {}
