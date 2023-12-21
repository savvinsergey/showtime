import { EUsersTableSort } from '../../users/ui/src/lib/enums/users-table-sort.enum';
import { ETableSortDirection } from '../enums/table-sort-direction.enum';

export interface ITableSortValue {
  field: EUsersTableSort | null;
  direction: ETableSortDirection;
}
