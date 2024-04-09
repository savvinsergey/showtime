import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthData } from './repositories/auth.repo';
import { AuthRepository } from '../../../domain/repositories/auth.repo';
import { Auth0Api } from './core/api/auth0.api';

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
