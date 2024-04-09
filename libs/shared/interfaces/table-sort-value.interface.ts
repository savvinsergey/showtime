import { ETableSortDirection } from '../enums/table-sort-direction.enum';

export interface ITableSortValue {
  field: string | null;
  direction: ETableSortDirection;
}
