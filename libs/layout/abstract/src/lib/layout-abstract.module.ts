import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutFacadeImplementation } from './facades/layout.facade';

import { LayoutFacade } from '@showtime/layout/ui/facade';
import { AuthApplicationModule } from '@showtime/auth/application';

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
