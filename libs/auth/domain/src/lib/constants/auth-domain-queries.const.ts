import { EAuthQueries } from '../enums/auth-queries.enum';
import { IsAuthQuery, UserQuery } from '@showtime/auth/domain/queries';

export const AUTH_DOMAIN_QUERIES = {
  [EAuthQueries.USER]: IsAuthQuery,
  [EAuthQueries.IS_AUTH]: UserQuery,
};
