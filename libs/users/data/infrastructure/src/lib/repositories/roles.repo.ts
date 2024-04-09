import { inject } from '@angular/core';
import { RolesUsersApi } from '../core/api/roles.api';
import { RolesUsersRepository } from '../../../../domain/repositories/roles.repo';
import { UsersStore } from '../core/store/users.store';
import { EUsersStoreKeys } from '../enums/users-store-keys.enum';
import { Observable } from 'rxjs';
import { IUsersStoreState } from '../interfaces/users-store-state.interface';
import { EUsersStoreActions } from '../enums/users-store-actions.enum';
import { UserRoleModel } from '../../../../domain/models/user-role.model';

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
