import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersStore } from '../core/store';
import { RolesUsersApi } from '../core/api';
import { IUsersStoreState } from '../interfaces';
import { EUsersStoreActions, EUsersStoreKeys } from '../enums';

import { RolesUsersRepository, UserRoleModel } from '@showtime/users/domain';

export class RolesUsersData implements RolesUsersRepository {
  public readonly api = inject(RolesUsersApi);
  public readonly store = inject(UsersStore);

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
