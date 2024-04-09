import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthDataModule } from '../../../infrastructure/src';
import { IsAuthQuery, UserQuery } from '@showtime/auth/application/queries';
import { LoginCommand, LogoutCommand } from '@showtime/auth/application/commands';

// TODO check using queries and commands without domain module
const queries = [IsAuthQuery, UserQuery];
const commands = [LoginCommand, LogoutCommand];

@NgModule({
  imports: [CommonModule, AuthDataModule],
  providers: [...queries, ...commands],
})
export class AuthApplicationModule {}
