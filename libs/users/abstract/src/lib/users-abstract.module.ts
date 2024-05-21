import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersApplicationModule } from '@showtime/users/application';
import { UsersFacade } from '@showtime/users/ui/facade';

import { UsersFacadeImplementation } from './facades';

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
