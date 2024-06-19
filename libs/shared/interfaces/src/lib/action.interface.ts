export interface IAction<P, T> {
  type: T;
  payload: P;
}
