import type { Observable } from 'rxjs';

import type { EAsyncStatusesCqrs } from '../enums';

export interface IFacadeState<V = unknown> {
  value$: Observable<V>;
  status$?: Observable<EAsyncStatusesCqrs>;
}
