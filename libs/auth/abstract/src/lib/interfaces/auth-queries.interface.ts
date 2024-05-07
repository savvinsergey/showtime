import { BaseCqrsQuery } from '@showtime/shared/utils';
import { UserModel } from '@showtime/auth/domain';

export interface IAuthQueries {
  isAuth: BaseCqrsQuery<null, boolean>;
  user: BaseCqrsQuery<void, UserModel>;
}
