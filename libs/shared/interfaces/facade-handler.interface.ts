import type { Observable } from 'rxjs';

import type { EAsyncStatusesCqrs } from '../enums';

export interface IFacadeHandler<C> {
  status$: Observable<EAsyncStatusesCqrs>;
  context$?: Observable<C>;
}
