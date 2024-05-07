import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersStore } from '../core/store';
import { UsersApi } from '../core/api';
import { IUsersStoreState } from '../interfaces';
import { EUsersStoreActions, EUsersStoreKeys } from '../enums';

import {
  IAllUsersPayload,
  IUsersUpdateRolesPayload,
  IUserUpdatePayload,
  UserModel,
  UserRoleModel,
  UsersRepository,
} from '@showtime/users/domain';

export class UsersData implements UsersRepository {
  public readonly api = inject(UsersApi);
  public readonly store = inject(UsersStore);

  // -------  USER -------- //

  public readonly allUsers$ = this.store.select(EUsersStoreKeys.ALL_USERS);

  public set allUsers(payload: UserModel[]) {
    this.store.dispatch<IUsersStoreState[EUsersStoreKeys.ALL_USERS]>({
      type: EUsersStoreActions.SET_ALL_USERS,
      payload,
    });
  }

  public getAll(payload?: IAllUsersPayload): Observable<UserModel[]> {
    return this.api.getAll(payload);
  }

  public update(payload: IUserUpdatePayload): Observable<UserModel> {
    return this.api.update(payload);
  }

  public delete(id: string): Observable<void> {
    return this.api.delete(id);
  }

  // ------- USER ROLES ------- //

  public getRoles(id: string): Observable<UserRoleModel[]> {
    return this.api.getRoles(id);
  }

  public updateRoles(payload: IUsersUpdateRolesPayload): Observable<void> {
    return this.api.updateRoles(payload);
  }
}
