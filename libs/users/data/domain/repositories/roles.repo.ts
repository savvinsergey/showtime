import { Observable } from 'rxjs';
import { UserRoleModel } from '@showtime/users/domain';

export abstract class RolesUsersRepository {
  public abstract allRoles$: Observable<UserRoleModel[]>;

  public abstract set allRoles(value: UserRoleModel[]);

  public abstract getAll(): Observable<UserRoleModel[]>;
}
