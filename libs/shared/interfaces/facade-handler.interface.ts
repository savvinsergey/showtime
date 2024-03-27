import { Observable } from 'rxjs';
import { EAsyncStatusesCqrs } from '../enums';

export interface IFacadeHandler<C> {
  status$: Observable<EAsyncStatusesCqrs>;
  context$?: Observable<C>;
}
