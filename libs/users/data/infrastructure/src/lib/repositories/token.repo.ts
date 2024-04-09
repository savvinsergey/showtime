import { inject } from '@angular/core';
import { TokenUsersApi } from '../core/api/token.api';
import { UsersStore } from '../core/store/users.store';
import { TokenUsersRepository } from '../../../../domain/repositories/token.repo';
import { Observable } from 'rxjs';
import { EUsersStoreKeys } from '../enums/users-store-keys.enum';
import { IUsersStoreState } from '../interfaces/users-store-state.interface';
import { EUsersStoreActions } from '../enums/users-store-actions.enum';

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
