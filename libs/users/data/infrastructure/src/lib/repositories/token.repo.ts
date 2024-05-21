import { inject } from '@angular/core';
import type { TokenUsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

import { TokenUsersApi } from '../core/api';
import { UsersStore } from '../core/store';
import { EUsersStoreActions, EUsersStoreKeys } from '../enums';
import type { IUsersStoreState } from '../interfaces';

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
