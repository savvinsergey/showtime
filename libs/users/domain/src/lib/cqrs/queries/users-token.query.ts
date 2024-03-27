import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import { Observable, tap } from 'rxjs';
import { UsersStore } from '../../core/store/users.store';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';
import { TokenUsersApi } from '../../core/api/token.api';
import { IUsersStoreState } from '../../interfaces/users-store-state.interface';

@Injectable()
export class UsersTokenQuery extends BaseCqrsQuery<void, IUsersStoreState[EUsersStoreKeys.TOKEN]> {
  private readonly tokenUsersApi = inject(TokenUsersApi);
  private readonly usersStore = inject(UsersStore);

  constructor() {
    super();

    this.value$ = this.usersStore.select(EUsersStoreKeys.TOKEN);
  }

  public override query(): Observable<string> {
    return this.tokenUsersApi.getToken().pipe(
      tap((payload: string) =>
        this.usersStore.dispatch<IUsersStoreState[EUsersStoreKeys.TOKEN]>({
          type: EUsersStoreActions.SET_TOKEN,
          payload,
        }),
      ),
    );
  }
}
