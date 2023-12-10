import { EUsersStoreKeys } from '../enums/users-store-keys.enum';

export interface IUsersStoreState {
  [EUsersStoreKeys.TOKEN]: '';
  [EUsersStoreKeys.ALL_ROLES]: any[];
  [EUsersStoreKeys.ALL_USERS]: any[];
  [EUsersStoreKeys.SELECTED_USER]: any;
}
