import { EUsersStoreKeys } from '../enums';
import { UserModel, UserRoleModel } from '@showtime/users/domain';

export interface IUsersStoreState {
  [EUsersStoreKeys.TOKEN]: string;
  [EUsersStoreKeys.ALL_ROLES]: UserRoleModel[];
  [EUsersStoreKeys.ALL_USERS]: UserModel[];
}
