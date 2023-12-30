import { EUsersTableSort } from '../enums/users-table-sort.enum';
import { ETableSortDirection } from '../../../../../shared/enums/table-sort-direction.enum';

export const USERS_TABLE_DEFAULT_SORT = {
  field: EUsersTableSort.EMAIL,
  direction: ETableSortDirection.ASC,
};
