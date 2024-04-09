import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../../../domain/repositories/auth.repo';
import { Auth0Api } from '../core/api/auth0.api';
import { UserModel } from '../../../../domain/models/user.model';

export class AuthData implements AuthRepository {
  private auth0Api = inject(Auth0Api);

  // ------------------------ //

  public readonly isAuthenticated$ = this.auth0Api.isAuthenticated$;
  public readonly user$ = this.auth0Api.user$ as Observable<UserModel>;

  public login(): Observable<void> {
    return this.auth0Api.login();
  }

  public logout(): Observable<void> {
    return this.auth0Api.logout();
  }
}
