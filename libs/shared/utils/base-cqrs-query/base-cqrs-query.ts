import {
  BehaviorSubject,
  catchError,
  delay,
  filter,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Query } from '@showtime/shared/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EAsyncStatusesCqrs } from '../../enums';

export class BaseCqrsQuery<C, M> implements Query<C, M> {
  private initialized = false;
  private needInitializeData = false;
  private defaultCriteria = {} as C;
  private isExternalValueUsed = false;

  private valueSource = new BehaviorSubject<M>(null as M);
  private statusSource = new BehaviorSubject<EAsyncStatusesCqrs>(EAsyncStatusesCqrs.NONE);
  private requestChangedSource = new ReplaySubject<C>(1);

  private innerValue$ = this.valueSource.asObservable();

  private set status(value: EAsyncStatusesCqrs) {
    this.statusSource.next(value);
  }

  protected set value$(value$: Observable<M>) {
    this.isExternalValueUsed = true;

    this.innerValue$ = value$.pipe(
      tap(() => {
        if (this.needInitializeData && !this.initialized) {
          this.requestChangedSource.next(this.defaultCriteria);
        }
      }),
      filter(value => (this.needInitializeData && this.initialized) || true),
    );
  }

  protected set value(value: M) {
    if (this.isExternalValueUsed) {
      console.warn('You cant set value cause used external stream');
      return;
    }

    this.valueSource.next(value);
  }

  public get value$(): Observable<M> {
    return this.innerValue$;
  }

  get metadata() {
    return {
      status$: this.statusSource.asObservable(),
    };
  }

  protected constructor() {
    this.requestChangedSource
      .pipe(
        tap(() => {
          this.initialized = true;
          this.status = EAsyncStatusesCqrs.PENDING;
        }),
        switchMap(criteria =>
          this.query(criteria).pipe(
            catchError(err => {
              this.status = EAsyncStatusesCqrs.ERROR;

              return throwError(err);
            }),
            tap(() => (this.status = EAsyncStatusesCqrs.SUCCESS)),
          ),
        ),
        delay(0),
        tap(() => (this.status = EAsyncStatusesCqrs.NONE)),
        shareReplay(1),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  public initialize(needInitializeData: boolean, defaultCriteria: C = {} as C) {
    this.needInitializeData = needInitializeData;
    this.defaultCriteria = defaultCriteria;
  }

  public execute(criteria: C = {} as C): void {
    this.requestChangedSource.next(criteria);
  }

  protected query(criteria?: C): Observable<M> {
    return of(null as M);
  }
}
