import { UsersRepository } from '../../../../domain/repositories/users.repo';
import { inject } from '@angular/core';
import { UsersApi } from '../core/api/users.api';
import { UsersStore } from '../core/store/users.store';
import { Observable } from 'rxjs';
import { IUserUpdatePayload } from '../../../../domain/interfaces/user-update-payload.interface';
import { IUsersUpdateRolesPayload } from '../../../../domain/interfaces/users-update-roles-payload.interface';
import { IAllUsersPayload } from '../../../../domain/interfaces/users-all-payload.interface';
import { UserRoleModel } from '../../../../domain/models/user-role.model';
import { EUsersStoreKeys } from '../enums/users-store-keys.enum';
import { IUsersStoreState } from '../interfaces/users-store-state.interface';
import { EUsersStoreActions } from '../enums/users-store-actions.enum';
import { UserModel } from '../../../../domain/models/user.model';

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
