import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { Params } from '@angular/router';
import { QUERY_PARAMETERS_LIST } from '@showtime/shared/const';
import { BaseParametersMapper } from '@showtime/shared/utils';
import { debounceTime, distinctUntilChanged, filter, map, Subject } from 'rxjs';

import { QueryParametersService } from './query-parameters.service';

@Injectable()
export class FiltersService<TValue> {
  private readonly converter = inject(BaseParametersMapper, { host: true });
  private readonly queryParamsList = inject(QUERY_PARAMETERS_LIST, { host: true });
  private readonly queryParamsService = inject(QueryParametersService);
  private readonly destroyRef = inject(DestroyRef);

  // ---------------------- //

  private queryParams: Params = {};
  private readonly filtersSource = new Subject<TValue>();

  public readonly filters$ = this.filtersSource.asObservable();

  public set filter(value: TValue) {
    const queryParameters = { ...this.queryParams };
    const parameters = this.converter?.fromDataToParams(value) || value;

    for (const key of Object.keys(parameters)) {
      queryParameters[key] = parameters[key];
    }

    if (JSON.stringify(queryParameters) === JSON.stringify(this.queryParams)) {
      return;
    }

    this.queryParams = queryParameters;
    this.queryParamsService.queryParams = queryParameters;
  }

  constructor() {
    this.initialize(this.queryParamsList);
  }

  public convertToPayload<TPayload>(filter: TValue): TPayload | TValue {
    if (!this.converter) {
      console.error('Please specify converter to use this method');
      return filter;
    }

    return this.converter?.fromDataToPayload(filter) as TPayload;
  }

  private initialize(queryParametersList: string[] | null) {
    if (!queryParametersList) {
      console.error('Please specify query params list');
      return;
    }

    this.queryParamsService.queryParams$
      .pipe(
        filter((value: Params, index: number) => !(index === 0 && Object.keys(value).length === 0)),
        map((queryParameters: Params) =>
          this.queryParamsService.convertQueryParams(queryParameters, queryParametersList),
        ),
        map(parameters => this.converter?.fromParamsToData(parameters) || parameters),
        debounceTime(0),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(filter => this.filtersSource.next(filter));
  }
}
