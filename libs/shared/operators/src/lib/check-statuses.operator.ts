import type { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import type { OperatorFunction } from 'rxjs';
import { map, pipe } from 'rxjs';

export const checkStatuses = (
  statusForCheck: EAsyncStatusesCqrs,
): OperatorFunction<EAsyncStatusesCqrs | EAsyncStatusesCqrs[], boolean> => {
  return pipe(
    map((statuses: EAsyncStatusesCqrs | EAsyncStatusesCqrs[]) =>
      Array.isArray(statuses) ? statuses.includes(statusForCheck) : statuses === statusForCheck,
    ),
  );
};
