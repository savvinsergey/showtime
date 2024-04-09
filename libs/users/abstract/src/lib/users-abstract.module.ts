import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersApplicationModule } from '../../../data/application/src';
import { UsersFacade } from '../../../ui/src/lib/facades/users.facade';
import { UsersFacadeImplementation } from './facades/users.facade';

@NgModule({
  imports: [CommonModule, UsersApplicationModule],
  providers: [
    {
      provide: UsersFacade,
      useClass: UsersFacadeImplementation,
    },
  ],
})
export class UsersAbstractModule {}
