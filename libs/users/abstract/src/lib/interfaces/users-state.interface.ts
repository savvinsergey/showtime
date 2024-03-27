import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { IUserRole } from '../../../../domain/src/lib/interfaces/user-roles.interface';
import { IRole } from '../../../../ui/src/lib/interfaces/role';
import { Observable } from 'rxjs';

export interface IUsersState {
  usersToken: IFacadeState<string>;
  userRoles: IFacadeState<IUserRole[]>;
  allRoles: IFacadeState<IRole[]>;
  allUsers: IFacadeState<UserModel[]>;
  user: IFacadeState<UserModel>;

  usersToken$?: Observable<string>;
  userRoles$?: Observable<IUserRole[]>;
  allRoles$?: Observable<IRole[]>;
  allUsers$?: Observable<UserModel[]>;
  user$?: Observable<UserModel>;
}
