import type { UserModel } from '@showtime/auth/domain';
import type { BaseCqrsQuery } from '@showtime/shared/utils';

export interface IAuthQueries {
  isAuth: BaseCqrsQuery<null, boolean>;
  user: BaseCqrsQuery<void, UserModel>;
}
