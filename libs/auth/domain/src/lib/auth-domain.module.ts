import { NgModule } from '@angular/core';
import { IsAuthQuery, UserQuery } from '@showtime/auth/domain/queries';
import { LoginCommand, LogoutCommand } from '@showtime/auth/domain/commands';
import { AUTH_DOMAIN_QUERIES } from './constants/auth-domain-queries.const';
import { AUTH_DOMAIN_COMMANDS } from './constants/auth-domain-commands.const';
import { AUTH_DOMAIN } from './constants/auth-domain.const';

const queries = [IsAuthQuery, UserQuery];

const commands = [LoginCommand, LogoutCommand];

@NgModule({
  providers: [...queries, ...commands],
})
export class AuthDomainModule {}
