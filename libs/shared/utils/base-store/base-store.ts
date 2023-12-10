import { IAction } from '@showtime/shared/interfaces';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilKeyChanged, pluck } from 'rxjs';

// https://betterprogramming.pub/how-to-write-a-redux-like-state-management-store-using-rxjs-33b6095c5a7e
export class BaseStore<T, A> {
  private _state: BehaviorSubject<T>;
  private readonly _reducer: (state: T, action: IAction<any, any>) => T;

  protected constructor(reducer: (state: T, action: IAction<any, any>) => T, initialState: T) {
    this._state = new BehaviorSubject(initialState);
    this._reducer = reducer;
  }

  public select<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(distinctUntilKeyChanged(key), pluck(key));
  }

  public subscribe(callback: (state: T) => void): Subscription {
    return this._state.subscribe(callback);
  }

  public dispatch = (action: IAction<any, any>): void => {
    const oldState = this._state.getValue();
    const newState = this._reducer(oldState, action);
    this._state.next(newState);
  };

  public asyncDispatch = async <R>(type: A, runner: (state: T) => Promise<R>): Promise<void> => {
    const payload = await runner(this._state.getValue());
    this.dispatch({ type, payload });
  };
}
