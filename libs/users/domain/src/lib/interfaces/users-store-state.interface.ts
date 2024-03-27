import { EUsersStoreKeys } from '../enums/users-store-keys.enum';
import { IRole } from '../../../../ui/src/lib/interfaces/role';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';

export interface IUsersStoreState {
  [EUsersStoreKeys.TOKEN]: string;
  [EUsersStoreKeys.ALL_ROLES]: IRole[];
  [EUsersStoreKeys.ALL_USERS]: UserModel[];
}
