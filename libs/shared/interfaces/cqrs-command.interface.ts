export interface IOnCommandExecute<TModel> {
  execute(model?: TModel | undefined): void;
}

export interface Command<TModel> extends IOnCommandExecute<TModel> {}
