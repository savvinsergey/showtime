import type { ITableSortValue } from '@showtime/shared/interfaces';
import type { TSearchValue } from '@showtime/shared/types';

export interface IUserPageData {
  search?: TSearchValue;
  sort?: ITableSortValue;
}

export interface IUserPagePayload {
  q?: string;
  sort?: string;
}

export interface IUserPageParameters {
  search?: string | null;
  sort?: string | null;
}
