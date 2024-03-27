import { DestroyRef, inject, Injectable } from '@angular/core';

import { BehaviorSubject, debounceTime, distinctUntilChanged, skip, startWith, tap } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Params } from '@angular/router';
import { QueryParamsService } from './query-params.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseParamsConverter } from '../utils/base-params-converter/base-params-converter';
import { QUERY_PARAMS_LIST } from '../constants/query-params-list-token.const';

@Injectable()
export class FiltersService<TValue> {
  private readonly converter = inject(BaseParamsConverter, { host: true });
  private readonly queryParamsList = inject(QUERY_PARAMS_LIST, { host: true });
  private readonly queryParamsService = inject(QueryParamsService);
  private readonly destroyRef = inject(DestroyRef);

  // ---------------------- //

  private queryParams: Params = {};
  private readonly filtersSource = new BehaviorSubject<TValue>({} as TValue);

  public readonly filters$ = this.filtersSource.asObservable().pipe(skip(1));

  public set filter(value: TValue) {
    const queryParams = { ...this.queryParams };
    const params = this.converter?.fromDataToParams(value) || value;

    Object.keys(params).forEach(key => {
      queryParams[key] = params[key];
    });

    if (JSON.stringify(queryParams) === JSON.stringify(this.queryParams)) {
      return;
    }

    this.queryParams = queryParams;
    this.queryParamsService.queryParams = queryParams;
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

  private initialize(queryParamsList: string[] | null) {
    if (!queryParamsList) {
      console.error('Please specify query params list');
      return;
    }

    this.queryParamsService.queryParams$
      .pipe(
        map((queryParams: Params) => this.queryParamsService.convertQueryParams(queryParams, queryParamsList)),
        map(params => this.converter?.fromParamsToData(params) || params),
        debounceTime(0),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(filter => this.filtersSource.next(filter));
  }
}
