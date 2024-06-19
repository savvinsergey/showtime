import { inject } from '@angular/core';
import type { AuthRepository, UserModel } from '@showtime/auth/domain';
import type { Observable } from 'rxjs';
import { delay, map, tap, withLatestFrom } from 'rxjs';

import { Auth0Api } from '../core/api';
import { AuthStore } from '../core/store';
import { EAuthStoreActions, EAuthStoreKeys } from '../enums';

export class AuthData implements AuthRepository {
  private readonly auth0Api = inject(Auth0Api);
  private readonly store = inject(AuthStore);

  // ------------------------ //

  public readonly isAuthenticated$ = this.auth0Api.isAuthenticated$;
  public readonly user$ = this.store.select(EAuthStoreKeys.USER).pipe(
    delay(0),
    withLatestFrom(this.auth0Api.user$),
    tap((users: [UserModel | null, UserModel]) => this.initUser(users)),
    map(([user]) => user),
  ) as Observable<UserModel>;

  public set user(payload: UserModel) {
    this.store.dispatch({
      type: EAuthStoreActions.SET_USER,
      payload,
    });
  }

  public login(): Observable<void> {
    return this.auth0Api.login();
  }

  public logout(): Observable<void> {
    return this.auth0Api.logout();
  }

  private initUser([user, externalUser]: [UserModel | null, UserModel]) {
    if (!user && externalUser) {
      this.user = !user && externalUser;
    }
  }
}
