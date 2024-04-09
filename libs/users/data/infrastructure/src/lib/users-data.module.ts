import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenUsersRepository } from '../../../domain/repositories/token.repo';
import { UsersTokenData } from './repositories/token.repo';
import { UsersData } from './repositories/users.repo';
import { UsersRepository } from '../../../domain/repositories/users.repo';
import { RolesUsersRepository } from '../../../domain/repositories/roles.repo';
import { RolesUsersData } from './repositories/roles.repo';
import { RolesUsersApi } from './core/api/roles.api';
import { TokenUsersApi } from './core/api/token.api';
import { UsersApi } from './core/api/users.api';

@NgModule({
  imports: [CommonModule],
  providers: [
    RolesUsersApi,
    UsersApi,
    TokenUsersApi,
    {
      provide: TokenUsersRepository,
      useClass: UsersTokenData,
    },
    {
      provide: UsersRepository,
      useClass: UsersData,
    },
    {
      provide: RolesUsersRepository,
      useClass: RolesUsersData,
    },
  ],
})
export class UsersDataModule {}
