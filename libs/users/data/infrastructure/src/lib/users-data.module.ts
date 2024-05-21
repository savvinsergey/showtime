import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RolesUsersRepository,
  TokenUsersRepository,
  UsersRepository,
} from '@showtime/users/domain';

import { RolesUsersApi, TokenUsersApi, UsersApi } from './core/api';
import { RolesUsersData, UsersData, UsersTokenData } from './repositories';

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
