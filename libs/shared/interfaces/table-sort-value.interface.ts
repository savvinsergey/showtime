import type { ETableSortDirection } from '../enums';

export interface ITableSortValue {
  field: string | null;
  direction: ETableSortDirection;
}
