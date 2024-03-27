import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ---------------------- //

  public readonly queryParams$ = this.route.queryParams;

  private queue = Promise.resolve(true);

  set queryParams({ ...queryParams }: Params) {
    Object.keys(queryParams).forEach(key => {
      if (Array.isArray(queryParams[key])) {
        queryParams[key] = queryParams[key].join(',');
      }
    });

    this.navigate({
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  public convertQueryParams(queryParams: Params, fieldsList: string[]): Params {
    return fieldsList
      .filter(field => {
        const [name] = field.split(':');
        return !!queryParams[name];
      })
      .reduce((obj, key) => {
        const [name, type] = key.split(':');
        let value = queryParams[name];

        if (type === 'array') {
          if (typeof queryParams[name] === 'string') {
            value = queryParams[name]?.split(',');
          } else {
            value = queryParams[name];
          }
        }

        if (type === 'boolean') {
          value = queryParams[name] === 'true';
        }

        if (type === 'number') {
          value = Number(queryParams[name]);
        }

        return { ...obj, [name]: value };
      }, {});
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
