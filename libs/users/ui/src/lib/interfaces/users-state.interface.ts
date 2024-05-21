import type { IFacadeState } from '@showtime/shared/interfaces';
import type { UserModel, UserRoleModel } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

export interface IUsersState {
  usersToken: IFacadeState<string>;
  userRoles: IFacadeState<UserRoleModel[]>;
  allRoles: IFacadeState<UserRoleModel[]>;
  allUsers: IFacadeState<UserModel[]>;
  user: IFacadeState<UserModel>;

  usersToken$?: Observable<string>;
  userRoles$?: Observable<UserRoleModel[]>;
  allRoles$?: Observable<UserRoleModel[]>;
  allUsers$?: Observable<UserModel[]>;
  user$?: Observable<UserModel>;
}
