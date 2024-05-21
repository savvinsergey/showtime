import { inject } from '@angular/core';
import type { RolesUsersRepository, UserRoleModel } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

import { RolesUsersApi } from '../core/api';
import { UsersStore } from '../core/store';
import { EUsersStoreActions, EUsersStoreKeys } from '../enums';
import type { IUsersStoreState } from '../interfaces';

export class RolesUsersData implements RolesUsersRepository {
  public readonly store = inject(UsersStore);
  public readonly api = inject(RolesUsersApi);

  // ---------------------- //

  public readonly allRoles$ = this.store.select(EUsersStoreKeys.ALL_ROLES);

  public set allRoles(payload: UserRoleModel[]) {
    this.store.dispatch<IUsersStoreState[EUsersStoreKeys.ALL_ROLES]>({
      type: EUsersStoreActions.SET_ALL_ROLES,
      payload,
    });
  }

  public getAll(): Observable<UserRoleModel[]> {
    return this.api.getAll();
  }
}
