import { EAuthStoreKeys } from '../enums/auth-store-keys.enum';

export interface IAuthStoreState {
  [EAuthStoreKeys.USER]: any;
}
