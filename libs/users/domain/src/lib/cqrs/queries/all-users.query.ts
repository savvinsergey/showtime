import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import { Observable, tap } from 'rxjs';
import { UsersStore } from '../../core/store/users.store';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { UsersApi } from '../../core/api/users.api';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';
import { IAllUsersPayload } from '../../interfaces/users-all-payload.interface';
import { UserModel } from '../../../../../../auth/domain/src/lib/core/models/user.model';
import { IUsersStoreState } from '../../interfaces/users-store-state.interface';

@Injectable()
export class AllUsersQuery extends BaseCqrsQuery<IAllUsersPayload, IUsersStoreState[EUsersStoreKeys.ALL_USERS]> {
  private readonly usersStore = inject(UsersStore);
  private readonly usersApi = inject(UsersApi);

  constructor() {
    super();

    this.value$ = this.usersStore.select(EUsersStoreKeys.ALL_USERS);
  }

  public override query(payload?: IAllUsersPayload): Observable<UserModel[]> {
    return this.usersApi.getAll(payload).pipe(
      tap((payload: UserModel[]) =>
        this.usersStore.dispatch<IUsersStoreState[EUsersStoreKeys.ALL_USERS]>({
          type: EUsersStoreActions.SET_ALL_USERS,
          payload,
        }),
      ),
    );
  }
}
