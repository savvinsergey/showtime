import type { BaseCqrsQuery } from '@showtime/shared/utils';
import type { IAllUsersPayload, UserModel, UserRoleModel } from '@showtime/users/domain';

export interface IUsersUiQueries {
  user: BaseCqrsQuery<void, UserModel>;
  allUsers: BaseCqrsQuery<IAllUsersPayload, UserModel[]>;
  allRoles: BaseCqrsQuery<void, UserRoleModel[]>;
  userRoles: BaseCqrsQuery<string, UserRoleModel[]>;
}
