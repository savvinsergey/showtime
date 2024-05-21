import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersDataModule } from '@showtime/users/infra';

import { DeleteCommand, UpdateCommand, UpdateRolesCommand } from './commands';
import { AllUsersQuery, GetRolesAllQuery, GetRolesByUserQuery, UsersTokenQuery } from './queries';

// TODO check using queries and commands without domain module

// prettier-ignore
const queries = [
  UsersTokenQuery,
  AllUsersQuery,
  GetRolesByUserQuery,
  GetRolesAllQuery
];
// prettier-ignore
const commands = [
  UpdateCommand,
  DeleteCommand,
  UpdateRolesCommand
];

@NgModule({
  imports: [CommonModule, UsersDataModule],
  providers: [...queries, ...commands],
})
export class UsersApplicationModule {}
