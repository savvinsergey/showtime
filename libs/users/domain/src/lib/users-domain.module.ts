import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersQuery } from './cqrs/queries/all-users.query';
import { GetRolesByUserQuery } from './cqrs/queries/get-roles-by-user.query';
import { UsersTokenQuery } from './cqrs/queries/users-token.query';
import { DeleteCommand, UpdateCommand } from '@showtime/users/domain/commands';
import { GetRolesAllQuery } from '@showtime/users/domain/queries';
import { UpdateRolesCommand } from './cqrs/commands/update-roles.command';

const queries = [UsersTokenQuery, AllUsersQuery, GetRolesByUserQuery, GetRolesAllQuery];

const commands = [UpdateCommand, DeleteCommand, UpdateRolesCommand];

@NgModule({
  imports: [CommonModule],
  providers: [...queries, ...commands],
})
export class UsersDomainModule {}
