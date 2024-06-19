import type { UserModel } from '@showtime/users/domain';

import type { EAuthStoreKeys } from '../enums';

export interface IAuthStoreState {
  [EAuthStoreKeys.USER]: UserModel | null;
}
