import { inject } from '@angular/core';
import type {
  IAllUsersPayload,
  IUsersUpdateRolesPayload,
  IUserUpdatePayload,
  UserModel,
  UserRoleModel,
  UsersRepository,
} from '@showtime/users/domain';
import type { Observable } from 'rxjs';

import { UsersApi } from '../core/api';
import { UsersStore } from '../core/store';
import { EUsersStoreActions, EUsersStoreKeys } from '../enums';
import type { IUsersStoreState } from '../interfaces';

export class UsersData implements UsersRepository {
  public readonly store = inject(UsersStore);
  public readonly api = inject(UsersApi);

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

  public delete(id: string): Observable<void> {
    return this.api.delete(id);
  }

  public update(payload: IUserUpdatePayload): Observable<UserModel> {
    return this.api.update(payload);
  }

  // ------- USER ROLES ------- //

  public getRoles(id: string): Observable<UserRoleModel[]> {
    return this.api.getRoles(id);
  }

  public updateRoles(payload: IUsersUpdateRolesPayload): Observable<void> {
    return this.api.updateRoles(payload);
  }
}
