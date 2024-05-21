import type { UserModel, UserRoleModel } from '@showtime/users/domain';

import type { EUsersStoreKeys } from '../enums';

export interface IUsersStoreState {
  [EUsersStoreKeys.TOKEN]: string;
  [EUsersStoreKeys.ALL_ROLES]: UserRoleModel[];
  [EUsersStoreKeys.ALL_USERS]: UserModel[];
}
