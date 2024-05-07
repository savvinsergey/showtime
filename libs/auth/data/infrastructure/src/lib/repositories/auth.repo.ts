import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Auth0Api } from '../core/api';

import { UserModel, AuthRepository } from '@showtime/auth/domain';

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
