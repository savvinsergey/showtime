import type { UserModel } from '@showtime/auth/domain';
import type { BaseCqrsQuery } from '@showtime/shared/utils';

export interface ILayoutUiQueries {
  user: BaseCqrsQuery<void, UserModel>;
}
