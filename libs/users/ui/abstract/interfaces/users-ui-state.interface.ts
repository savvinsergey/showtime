import type { IFacadeState } from '@showtime/shared/interfaces';
import type { UserModel, UserRoleModel } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

export interface IUsersUiState {
  userRoles: IFacadeState<UserRoleModel[]>;
  allRoles: IFacadeState<UserRoleModel[]>;
  allUsers: IFacadeState<UserModel[]>;
  user: IFacadeState<UserModel>;

  userRoles$?: Observable<UserRoleModel[]>;
  allRoles$?: Observable<UserRoleModel[]>;
  allUsers$?: Observable<UserModel[]>;
  user$?: Observable<UserModel>;
}
