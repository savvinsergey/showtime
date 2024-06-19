import type { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import type { Observable } from 'rxjs';

export interface IFacadeState<V = unknown> {
  value$: Observable<V>;
  status$?: Observable<EAsyncStatusesCqrs>;
}
