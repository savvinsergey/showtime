import { Observable } from 'rxjs';
import { EAsyncStatusesCqrs } from '../enums';

export interface IFacadeState<V = unknown> {
  value$: Observable<V>;
  status$?: Observable<EAsyncStatusesCqrs>;
}
