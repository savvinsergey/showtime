import { Observable } from 'rxjs';
import { UserRoleModel } from '../models/user-role.model';

export abstract class RolesUsersRepository {
  public abstract allRoles$: Observable<UserRoleModel[]>;

  public abstract set allRoles(value: UserRoleModel[]);

  public abstract getAll(): Observable<UserRoleModel[]>;
}
