import { BaseCqrsQuery } from '@showtime/shared/utils';
import { UserModel } from '../../../../data/domain/models/user.model';

export interface IAuthQueries {
  isAuth: BaseCqrsQuery<null, boolean>;
  user: BaseCqrsQuery<void, UserModel>;
}
