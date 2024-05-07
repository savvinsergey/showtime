import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteCommand, UpdateCommand, UpdateRolesCommand } from './commands';
import { AllUsersQuery, GetRolesAllQuery, GetRolesByUserQuery, UsersTokenQuery } from './queries';

import { UsersDataModule } from '@showtime/users/infra';

// TODO check using queries and commands without domain module
const queries = [UsersTokenQuery, AllUsersQuery, GetRolesByUserQuery, GetRolesAllQuery];
const commands = [UpdateCommand, DeleteCommand, UpdateRolesCommand];

@NgModule({
  imports: [CommonModule, UsersDataModule],
  providers: [...queries, ...commands],
})
export class UsersApplicationModule {}
