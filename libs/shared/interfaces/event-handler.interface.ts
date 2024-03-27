export interface IEventHandler<C = unknown> {
  value: boolean;
  context?: C;
}
