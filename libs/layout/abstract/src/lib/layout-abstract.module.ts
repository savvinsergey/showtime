import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutFacadeImplementation } from './facades/layout.facade';
import { AuthApplicationModule } from '../../../../auth/data/application/src';
import { LayoutFacade } from '../../../ui/src/lib/facades/layout.facade';

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
