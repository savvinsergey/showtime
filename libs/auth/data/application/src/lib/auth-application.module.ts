import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsAuthQuery, UserQuery } from './queries';
import { LoginCommand, LogoutCommand } from './commands';

import { AuthDataModule } from '@showtime/auth/infra';

// TODO check using queries and commands without domain module
const queries = [IsAuthQuery, UserQuery];
const commands = [LoginCommand, LogoutCommand];

@NgModule({
  imports: [CommonModule, AuthDataModule],
  providers: [...queries, ...commands],
})
export class AuthApplicationModule {}
