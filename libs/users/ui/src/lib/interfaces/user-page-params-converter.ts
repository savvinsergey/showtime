import { TSearchValue } from '../../../../../shared/types/search-value.type';
import { ITableSortValue } from '../../../../../shared/interfaces/table-sort-value.interface';

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
