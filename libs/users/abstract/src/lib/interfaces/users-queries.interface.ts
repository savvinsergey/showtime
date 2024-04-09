import { BaseCqrsQuery } from '@showtime/shared/utils';
import { IAllUsersPayload } from '../../../../data/domain/interfaces/users-all-payload.interface';
import { UserRoleModel } from '../../../../data/domain/models/user-role.model';
import { UserModel } from '../../../../data/domain/models/user.model';

export interface IUsersQueries {
  user: BaseCqrsQuery<void, UserModel>;
  allUsers: BaseCqrsQuery<IAllUsersPayload, UserModel[]>;
  allRoles: BaseCqrsQuery<void, UserRoleModel[]>;
  userRoles: BaseCqrsQuery<string, UserRoleModel[]>;
  usersToken: BaseCqrsQuery<void, string>;
}
