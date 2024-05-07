import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesUsersApi, UsersApi, TokenUsersApi } from './core/api';
import { UsersTokenData, UsersData, RolesUsersData } from './repositories';

import { RolesUsersRepository, TokenUsersRepository, UsersRepository } from '@showtime/users/domain';

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
