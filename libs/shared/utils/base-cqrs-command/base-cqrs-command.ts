import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, concatMap, delay, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import 'reflect-metadata';
import { Command } from '../../interfaces';
import { EAsyncStatusesCqrs } from '../../enums';
import { PropertyToMeta } from '../../decorators/property-to-meta.decorator';

export abstract class BaseCqrsCommand<M> implements Command<M> {
  private readonly requestSource = new ReplaySubject<M | undefined>(1);
  private readonly statusSource = new BehaviorSubject<EAsyncStatusesCqrs>(EAsyncStatusesCqrs.NONE);
  private readonly contextSource = new BehaviorSubject<any>(null);

  private set status(value: EAsyncStatusesCqrs) {
    this.statusSource.next(value);
  }

  private set context(value: any) {
    this.contextSource.next(value);
  }

  public get metadata() {
    return {
      status$: this.statusSource.asObservable(),
      context$: this.contextSource.asObservable(),
    };
  }

  constructor() {
    this.requestSource
      .pipe(
        tap((model: M | undefined) => {
          this.context = model;
          this.status = EAsyncStatusesCqrs.PENDING;
        }),
        concatMap((model?: M | undefined) =>
          this.command(model).pipe(
            catchError(err => {
              this.status = EAsyncStatusesCqrs.ERROR;

              return throwError(err);
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

  protected abstract command(model?: M): Observable<any>;
}
