import { BaseCqrsQuery } from '@showtime/shared/utils';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';

export interface IAuthQueries {
  isAuth: BaseCqrsQuery<null, boolean>;
  user: BaseCqrsQuery<void, UserModel>;
}
