import { EUsersTableSort } from '../enums';
import { ETableSortDirection } from '@showtime/shared/enums';

export const USERS_TABLE_DEFAULT_SORT = {
  field: EUsersTableSort.EMAIL,
  direction: ETableSortDirection.ASC,
};
