import { BaseParamsConverter } from '../../../../../../../shared/utils/base-params-converter/base-params-converter';
import { Injectable } from '@angular/core';
import { IUserPageData, IUserPageParams, IUserPagePayload } from '../../../interfaces/user-page-params-converter';
import { TSearchValue } from '../../../../../../../shared/types/search-value.type';
import { ITableSortValue } from '../../../../../../../shared/interfaces/table-sort-value.interface';

@Injectable()
export class UsersPageParamsConverterService
  implements BaseParamsConverter<IUserPageData, IUserPageParams, IUserPagePayload>
{
  public fromDataToParams(data: IUserPageData): IUserPageParams {
    const search = {
      search: data.search?.searchString ? `${data.search.type}:"${data.search.searchString}"` : null,
    };
    const sort = {
      sort: data.sort ? `${data.sort.field}:${data.sort.direction}` : null,
    };

    return {
      ...search,
      ...sort,
    };
  }

  public fromParamsToData({ search, sort }: IUserPageParams): IUserPageData {
    const searchParam = search
      ? {
          search: {
            type: search.split(':')[0],
            searchString: search.split(':')[1]?.replace(/"/g, ''),
          } satisfies TSearchValue,
        }
      : {};
    const sortParam = sort
      ? {
          sort: {
            field: sort.split(':')[0],
            direction: Number(sort.split(':')[1]),
          } satisfies ITableSortValue,
        }
      : {};

    return {
      ...searchParam,
      ...sortParam,
    };
  }

  public fromDataToPayload(data: IUserPageData): IUserPagePayload {
    const q = data.search ? { q: `${data.search.type}:"${data.search.searchString}"` } : {};
    const sort = data.sort ? { sort: `${data.sort.field}:${data.sort.direction}` } : {};

    return {
      ...q,
      ...sort,
    };
  }
}
