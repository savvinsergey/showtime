import 'reflect-metadata';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import type { Command, IFacadeHandler } from '@showtime/shared/interfaces';
import type { Observable } from 'rxjs';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  delay,
  ReplaySubject,
  tap,
  throwError,
} from 'rxjs';

export abstract class BaseCqrsCommand<M, R> implements Command<M> {
  private readonly requestSource = new ReplaySubject<M | undefined>(1);
  private readonly statusSource = new BehaviorSubject<EAsyncStatusesCqrs>(EAsyncStatusesCqrs.NONE);
  private readonly contextSource = new BehaviorSubject<M>(null as M);

  private set status(value: EAsyncStatusesCqrs) {
    this.statusSource.next(value);
  }

  private set context(value: M) {
    this.contextSource.next(value);
  }

  public get metadata(): IFacadeHandler<M> {
    return {
      status$: this.statusSource.asObservable(),
      context$: this.contextSource.asObservable(),
    };
  }

  public isModel = (model: M | undefined): model is M => !!model;

  constructor() {
    this.requestSource
      .pipe(
        tap((model: M | undefined) => {
          if (this.isModel(model)) {
            this.context = model;
          }
          this.status = EAsyncStatusesCqrs.PENDING;
        }),
        concatMap((model?: M | undefined) =>
          this.command(model).pipe(
            catchError(error => {
              this.status = EAsyncStatusesCqrs.ERROR;

              return throwError(error);
            }),
          ),
        ),
        tap(() => {
          this.context = null as M;
          this.status = EAsyncStatusesCqrs.SUCCESS;
        }),
        delay(0),
        tap(() => (this.status = EAsyncStatusesCqrs.NONE)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  public execute(model?: M | undefined): void {
    this.requestSource.next(model);
  }

  protected abstract command(model?: M): Observable<R>;
}
