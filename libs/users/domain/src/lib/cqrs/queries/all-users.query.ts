import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';

import { User } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';
import { UsersStore } from '../../core/store/users.store';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { UsersApi } from '../../core/api/users.api';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';
import { IAllUsersPayload } from '../../interfaces/users-all-payload.interface';

@Injectable()
export class AllUsersQuery extends BaseCqrsQuery<IAllUsersPayload, User[]> {
  private readonly usersStore = inject(UsersStore);
  private readonly usersApi = inject(UsersApi);

  constructor() {
    super();

    this.value$ = this.usersStore.select(EUsersStoreKeys.ALL_USERS);
  }

  public override query(payload?: IAllUsersPayload): Observable<User[]> {
    return this.usersApi.getAll(payload).pipe(
      tap((payload: User[]) =>
        this.usersStore.dispatch({
          type: EUsersStoreActions.SET_ALL_USERS,
          payload,
        }),
      ),
    );
  }
}
