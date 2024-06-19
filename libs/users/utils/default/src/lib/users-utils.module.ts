import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersAbstractModule } from '@showtime/users/abstract';
import { UsersUtilsFacade } from '@showtime/users/utils/abstract';

@NgModule({
  imports: [CommonModule, UsersAbstractModule.forFeature({ provideTo: UsersUtilsFacade })],
})
export class UsersUtilsModule {}
