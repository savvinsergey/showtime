import { TSearchValue } from '@showtime/shared/types';
import { ITableSortValue } from '@showtime/shared/interfaces';

export interface IUserPageData {
  search?: TSearchValue;
  sort?: ITableSortValue;
}

export interface IUserPagePayload {
  q?: string;
  sort?: string;
}

export interface IUserPageParams {
  search?: string | null;
  sort?: string | null;
}
