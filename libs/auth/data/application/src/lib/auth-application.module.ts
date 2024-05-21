import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthDataModule } from '@showtime/auth/infra';

import { LoginCommand, LogoutCommand } from './commands';
import { IsAuthQuery, UserQuery } from './queries';

// TODO check using queries and commands without domain module

// prettier-ignore
const queries = [
  IsAuthQuery,
  UserQuery
];
// prettier-ignore
const commands = [
  LoginCommand,
  LogoutCommand
];

@NgModule({
  imports: [CommonModule, AuthDataModule],
  providers: [...queries, ...commands],
})
export class AuthApplicationModule {}
