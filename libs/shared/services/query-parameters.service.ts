import { inject, Injectable } from '@angular/core';
import type { NavigationExtras, Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryParametersService {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ---------------------- //

  public readonly queryParams$ = this.route.queryParams;

  private queue = Promise.resolve(true);

  set queryParams({ ...queryParameters }: Params) {
    for (const key of Object.keys(queryParameters)) {
      if (Array.isArray(queryParameters[key])) {
        queryParameters[key] = queryParameters[key].join(',');
      }
    }

    this.navigate({
      relativeTo: this.route,
      queryParams: queryParameters,
      queryParamsHandling: 'merge',
    });
  }

  public convertQueryParams(queryParameters: Params, fieldsList: string[]): Params {
    const filteredFieldsList = fieldsList.filter(field => {
      const [name] = field.split(':');
      return !!queryParameters[name];
    });

    let resultObject: Params = {};
    for (const filteredField of filteredFieldsList) {
      resultObject = {
        ...resultObject,
        ...this.buildParam(queryParameters, filteredField),
      };
    }

    return resultObject;
  }

  private buildParam(queryParameters: Params, key: string): Params {
    const [name, type] = key.split(':');
    let value = queryParameters[name];

    if (type === 'array') {
      value =
        typeof queryParameters[name] === 'string'
          ? queryParameters[name]?.split(',')
          : queryParameters[name];
    }

    if (type === 'boolean') {
      value = queryParameters[name] === 'true';
    }

    if (type === 'number') {
      value = Number(queryParameters[name]);
    }

    return { [name]: value };
  }

  // Modification of 'navigate' func for using with sequential queue
  private navigate(extras: NavigationExtras) {
    const enqueue = async () => {
      try {
        await this.queue;
      } catch (error) {
        console.error(error);
      }
      return await this.router.navigate([], extras);
    };

    this.queue = enqueue();

    return this.queue;
  }
}
