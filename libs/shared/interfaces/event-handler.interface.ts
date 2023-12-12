export interface IEventHandler<C = any> {
  value: boolean;
  context?: C;
}
