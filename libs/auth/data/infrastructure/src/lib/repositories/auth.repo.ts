import { inject } from '@angular/core';
import type { AuthRepository, UserModel } from '@showtime/auth/domain';
import type { Observable } from 'rxjs';

import { Auth0Api } from '../core/api';

export class AuthData implements AuthRepository {
  private readonly auth0Api = inject(Auth0Api);

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
