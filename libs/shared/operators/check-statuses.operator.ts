import type { OperatorFunction } from 'rxjs';
import { map, pipe } from 'rxjs';

import type { EAsyncStatusesCqrs } from '../enums';

export const checkStatuses = (
  statusForCheck: EAsyncStatusesCqrs,
): OperatorFunction<EAsyncStatusesCqrs | EAsyncStatusesCqrs[], boolean> => {
  return pipe(
    map((statuses: EAsyncStatusesCqrs | EAsyncStatusesCqrs[]) =>
      Array.isArray(statuses) ? statuses.includes(statusForCheck) : statuses === statusForCheck,
    ),
  );
};
