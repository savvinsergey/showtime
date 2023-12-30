import { BaseParamsConverter } from '../../../../../../../shared/utils/base-params-converter/base-params-converter';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersPageParamsConverterService implements BaseParamsConverter {
  public fromDataToParams(data: Record<string, any>): Record<string, any> {
    const search = {
      search: data['search']['searchString'] ? `${data['search']['type']}:"${data['search']['searchString']}"` : null,
    };
    const sort = {
      sort: data['sort'] ? `${data['sort']['field']}:${data['sort']['direction']}` : null,
    };

    return {
      ...search,
      ...sort,
    };
  }

  public fromParamsToData(params: Record<string, any>): Record<string, any> {
    const { search, sort } = params;

    const searchParam = search
      ? {
          search: {
            type: search.split(':')[0],
            searchString: search.split(':')[1]?.replaceAll('"', ''),
          },
        }
      : {};
    const sortParam = sort
      ? {
          sort: {
            field: sort.split(':')[0],
            direction: Number(sort.split(':')[1]),
          },
        }
      : {};

    return {
      ...searchParam,
      ...sortParam,
    };
  }

  public fromDataToPayload(data: Record<string, any>): Record<string, any> {
    const q = data['search'] ? { q: `${data['search']['type']}:"${data['search']['searchString']}"` } : {};
    const sort = data['sort'] ? { sort: `${data['sort']['field']}:${data['sort']['direction']}` } : {};

    return {
      ...q,
      ...sort,
    };
  }
}
