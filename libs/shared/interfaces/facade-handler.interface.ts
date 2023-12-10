import { Observable } from 'rxjs';
import { EAsyncStatusesCqrs } from '../enums';

export interface IFacadeHandler {
  status$: Observable<EAsyncStatusesCqrs>;
  context$?: Observable<any>;
}
