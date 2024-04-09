import { IAllUsersPayload } from '../interfaces/users-all-payload.interface';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserRoleModel } from '../models/user-role.model';
import { IUserUpdatePayload } from '../interfaces/user-update-payload.interface';
import { IUsersUpdateRolesPayload } from '../interfaces/users-update-roles-payload.interface';

export abstract class UsersRepository {
  public abstract allUsers$: Observable<UserModel[]>;

  public abstract set allUsers(value: UserModel[]);

  public abstract getAll(payload?: IAllUsersPayload): Observable<UserModel[]>;
  public abstract update(payload: IUserUpdatePayload): Observable<UserModel>;
  public abstract delete(id: string): Observable<void>;

  public abstract getRoles(id: string): Observable<UserRoleModel[]>;
  public abstract updateRoles(payload: IUsersUpdateRolesPayload): Observable<void>;
}
