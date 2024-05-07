import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthData } from './repositories';
import { Auth0Api } from './core/api';

import { AuthRepository } from '@showtime/auth/domain';

@NgModule({
  imports: [CommonModule],
  providers: [
    Auth0Api,
    {
      provide: AuthRepository,
      useClass: AuthData,
    },
  ],
})
export class AuthDataModule {}
