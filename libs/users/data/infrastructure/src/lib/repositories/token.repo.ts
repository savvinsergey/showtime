import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersStore } from '../core/store';
import { TokenUsersApi } from '../core/api';
import { IUsersStoreState } from '../interfaces';
import { EUsersStoreActions, EUsersStoreKeys } from '../enums';

import { TokenUsersRepository } from '@showtime/users/domain';

export class UsersTokenData implements TokenUsersRepository {
  public readonly api = inject(TokenUsersApi);
  public readonly store = inject(UsersStore);

  // --------------------- //

  public token$ = this.store.select(EUsersStoreKeys.TOKEN);

  public set token(payload: string) {
    this.store.dispatch<IUsersStoreState[EUsersStoreKeys.TOKEN]>({
      type: EUsersStoreActions.SET_TOKEN,
      payload,
    });
  }

  public getToken(): Observable<string> {
    return this.api.getToken();
  }
}
