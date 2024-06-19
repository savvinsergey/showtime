import type { UserModel } from '@showtime/auth/domain';
import type { BaseCqrsQuery } from '@showtime/shared/utils';

export interface IAuthUtilsQueries {
  user: BaseCqrsQuery<void, UserModel>;
}
