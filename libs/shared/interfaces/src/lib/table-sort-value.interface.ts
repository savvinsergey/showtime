import type { ETableSortDirection } from '@showtime/shared/enums';

export interface ITableSortValue {
  field: string | null;
  direction: ETableSortDirection;
}
