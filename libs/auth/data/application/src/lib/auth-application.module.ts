import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthDataModule } from '@showtime/auth/infra';

import { LoginCommand, LogoutCommand, UpdateUserCommand } from './commands';
import { IsAuthQuery, UserQuery } from './queries';

// prettier-ignore
const queries = [
  IsAuthQuery,
  UserQuery
];
// prettier-ignore
const commands = [
  LoginCommand,
  LogoutCommand,
  UpdateUserCommand
];

@NgModule({
  imports: [CommonModule, AuthDataModule],
  providers: [...queries, ...commands],
})
export class AuthApplicationModule {}
