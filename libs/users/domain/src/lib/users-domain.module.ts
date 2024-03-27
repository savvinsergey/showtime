import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersQuery } from './cqrs/queries/all-users.query';
import { GetRolesByUserQuery } from '@showtime/users/domain/queries';
import { UsersTokenQuery } from '@showtime/users/domain/queries';
import { DeleteCommand, UpdateCommand } from '@showtime/users/domain/commands';
import { GetRolesAllQuery } from '@showtime/users/domain/queries';
import { UpdateRolesCommand } from '@showtime/users/domain/commands';

// TODO check using queries and commands without domain module
const queries = [UsersTokenQuery, AllUsersQuery, GetRolesByUserQuery, GetRolesAllQuery];

const commands = [UpdateCommand, DeleteCommand, UpdateRolesCommand];

@NgModule({
  imports: [CommonModule],
  providers: [...queries, ...commands],
})
export class UsersDomainModule {}
