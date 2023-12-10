import { Observable } from 'rxjs';

export interface IQueryValues<TModel> {
  value$: Observable<TModel>;
}

export interface IOnQueryExecute<TCriteria> {
  execute(criteria?: TCriteria): void;
}

export interface Query<TCriteria, TModel> extends IQueryValues<TModel>, IOnQueryExecute<TCriteria> {}
