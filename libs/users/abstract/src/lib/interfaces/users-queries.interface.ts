import { BaseCqrsQuery } from '@showtime/shared/utils';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IAllUsersPayload } from '../../../../domain/src/lib/interfaces/users-all-payload.interface';
import { User } from '@auth0/auth0-angular';
import { IUserRole } from '../../../../domain/src/lib/interfaces/user-roles.interface';
import { IRole } from '../../../../ui/src/lib/interfaces/role';

export interface IUsersQueries {
  user: BaseCqrsQuery<void, UserModel>;
  allUsers: BaseCqrsQuery<IAllUsersPayload, UserModel[]>;
  allRoles: BaseCqrsQuery<void, IRole[]>;
  userRoles: BaseCqrsQuery<string, IUserRole[]>;
  usersToken: BaseCqrsQuery<void, string>;
}
