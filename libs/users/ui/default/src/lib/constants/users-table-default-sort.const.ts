import { ETableSortDirection } from '@showtime/shared/enums';

import { EUsersTableSort } from '../enums';

export const USERS_TABLE_DEFAULT_SORT = {
  field: EUsersTableSort.EMAIL,
  direction: ETableSortDirection.ASC,
};
