import { Observable } from 'rxjs';
import {
  UserModel,
  UserRoleModel,
  IUserUpdatePayload,
  IUsersUpdateRolesPayload,
  IAllUsersPayload,
} from '@showtime/users/domain';

export abstract class UsersRepository {
  public abstract allUsers$: Observable<UserModel[]>;

  public abstract set allUsers(value: UserModel[]);

  public abstract getAll(payload?: IAllUsersPayload): Observable<UserModel[]>;
  public abstract update(payload: IUserUpdatePayload): Observable<UserModel>;
  public abstract delete(id: string): Observable<void>;

  public abstract getRoles(id: string): Observable<UserRoleModel[]>;
  public abstract updateRoles(payload: IUsersUpdateRolesPayload): Observable<void>;
}
