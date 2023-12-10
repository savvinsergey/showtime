export interface IAction<T, R> {
  type: R;
  payload?: T;
}
