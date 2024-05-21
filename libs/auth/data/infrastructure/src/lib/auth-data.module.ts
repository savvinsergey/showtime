import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRepository } from '@showtime/auth/domain';

import { Auth0Api } from './core/api';
import { AuthData } from './repositories';

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
