import { EUsersStoreKeys } from '../enums/users-store-keys.enum';
import { UserModel } from '../../../../domain/models/user.model';
import { UserRoleModel } from '../../../../domain/models/user-role.model';

export interface IUsersStoreState {
  [EUsersStoreKeys.TOKEN]: string;
  [EUsersStoreKeys.ALL_ROLES]: UserRoleModel[];
  [EUsersStoreKeys.ALL_USERS]: UserModel[];
}
