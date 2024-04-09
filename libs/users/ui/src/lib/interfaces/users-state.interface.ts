import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { UserRoleModel } from '../../../../data/domain/models/user-role.model';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../data/domain/models/user.model';

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
