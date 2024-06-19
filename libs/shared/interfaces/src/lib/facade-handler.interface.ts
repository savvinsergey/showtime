import type { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import type { Observable } from 'rxjs';

export interface IFacadeHandler<C> {
  status$: Observable<EAsyncStatusesCqrs>;
  context$?: Observable<C>;
}
