import { Injectable } from '@angular/core';
import type { ITableSortValue } from '@showtime/shared/interfaces';
import type { TSearchValue } from '@showtime/shared/types';
import type { BaseParametersMapper } from '@showtime/shared/utils';
import type { IUserPageData, IUserPageParameters, IUserPagePayload } from '@showtime/users/ui';

@Injectable()
export class UsersPageParametersMapperService
  implements BaseParametersMapper<IUserPageData, IUserPageParameters, IUserPagePayload>
{
  public fromDataToParams(data: IUserPageData): IUserPageParameters {
    const search = {
      search: data.search?.searchString
        ? `${data.search.type}:"${data.search.searchString}"`
        : null,
    };
    const sort = {
      sort: data.sort ? `${data.sort.field}:${data.sort.direction}` : null,
    };

    return {
      ...search,
      ...sort,
    };
  }

  public fromDataToPayload(data: IUserPageData): IUserPagePayload {
    // prettier-ignore
    const q = data.search
      ? { q: `${data.search.type}:"${data.search.searchString}"` }
      : {};
    // prettier-ignore
    const sort = data.sort
      ? { sort: `${data.sort.field}:${data.sort.direction}` }
      : {};

    return {
      ...q,
      ...sort,
    };
  }

  public fromParamsToData({ search, sort }: IUserPageParameters): IUserPageData {
    const searchParameter = search
      ? {
          search: {
            type: search.split(':')[0],
            searchString: search.split(':')[1]?.replace(/"/g, ''),
          } as TSearchValue,
        }
      : {};
    const sortParameter = sort
      ? {
          sort: {
            field: sort.split(':')[0],
            direction: Number(sort.split(':')[1]),
          } as ITableSortValue,
        }
      : {};

    return {
      ...searchParameter,
      ...sortParameter,
    };
  }
}
