import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';

import { Observable, tap } from 'rxjs';

import { RolesUsersApi } from '../../core/api/roles.api';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { UsersStore } from '../../core/store/users.store';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';

@Injectable()
export class GetRolesAllQuery extends BaseCqrsQuery<void, string[]> {
  private readonly rolesUsersApi = inject(RolesUsersApi);
  private readonly usersStore = inject(UsersStore);

  constructor() {
    super();

    this.value$ = this.usersStore.select(EUsersStoreKeys.ALL_ROLES);
  }

  public override query(): Observable<string[]> {
    return this.rolesUsersApi.getAll().pipe(
      tap((payload: string[]) =>
        this.usersStore.dispatch({
          type: EUsersStoreActions.SET_ALL_ROLES,
          payload,
        }),
      ),
    );
  }
}
