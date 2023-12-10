import { Observable } from 'rxjs';
import { EAsyncStatusesCqrs } from '../enums';

export interface IFacadeState {
  value$: Observable<any>;
  status$?: Observable<EAsyncStatusesCqrs>;
}
