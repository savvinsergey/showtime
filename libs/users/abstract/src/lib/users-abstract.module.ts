import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersFacadeImplementation } from './facades';

import { UsersApplicationModule } from '@showtime/users/application';
import { UsersFacade } from '@showtime/users/ui/facade';

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
