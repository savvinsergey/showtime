import { Observable } from 'rxjs';
import { UserModel, UserRoleModel } from '@showtime/users/domain';
import { IFacadeState } from '@showtime/shared/interfaces';

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
