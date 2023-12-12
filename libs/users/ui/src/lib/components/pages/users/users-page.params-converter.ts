import { BaseParamsConverter } from '../../../../../../../shared/utils/base-params-converter/base-params-converter';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersPageParamsConverterService implements BaseParamsConverter {
  public fromDataToParams(data: Record<string, any>): Record<string, any> {
    const search = {
      search: data['searchString'] ? `${data['type']}:"${data['searchString']}"` : null,
    };

    return {
      ...search,
    };
  }

  public fromParamsToData(params: Record<string, any>): Record<string, any> {
    const { search } = params;

    const searchParam = search
      ? {
          search: {
            type: search.split(':')[0],
            searchString: search.split(':')[1]?.replaceAll('"', ''),
          },
        }
      : {};

    return {
      ...searchParam,
    };
  }

  public fromDataToPayload(data: Record<string, any>): Record<string, any> {
    const q = data['search'] ? { q: `${data['search']['type']}:*${data['search']['searchString']}*` } : {};

    return {
      ...q,
    };
  }
}
