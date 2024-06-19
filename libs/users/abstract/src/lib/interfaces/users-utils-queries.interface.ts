import type { BaseCqrsQuery } from '@showtime/shared/utils';
export interface IUsersUtilsQueries {
  usersToken: BaseCqrsQuery<void, string>;
}
