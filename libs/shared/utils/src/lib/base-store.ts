import type { IAction } from '@showtime/shared/interfaces';
import type { ValueOf } from '@showtime/shared/types';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilKeyChanged, pluck } from 'rxjs';

// https://betterprogramming.pub/how-to-write-a-redux-like-state-management-store-using-rxjs-33b6095c5a7e
export class BaseStore<S, A> {
  private _state: BehaviorSubject<S>;
  private readonly _reducer: <P extends ValueOf<S>>(state: S, action: IAction<P, A>) => S;

  protected constructor(
    reducer: <P extends ValueOf<S>>(state: S, action: IAction<P, A>) => S,
    initialState: S,
  ) {
    this._state = new BehaviorSubject(initialState);
    this._reducer = reducer;
  }

  public select<K extends keyof S>(key: K): Observable<S[K]> {
    return this._state.pipe(distinctUntilKeyChanged(key), pluck(key));
  }

  public subscribe(callback: (state: S) => void): Subscription {
    return this._state.subscribe(callback);
  }

  public dispatch = <P extends ValueOf<S>>(action: IAction<P, A>): void => {
    const oldState = this._state.getValue();
    const newState = this._reducer<P>(oldState, action);
    this._state.next(newState);
  };
}
