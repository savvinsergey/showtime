import { map, OperatorFunction, pipe } from 'rxjs';
import { EAsyncStatusesCqrs } from '../enums';

export const checkStatuses = (
  statusForCheck: EAsyncStatusesCqrs,
): OperatorFunction<EAsyncStatusesCqrs | EAsyncStatusesCqrs[], boolean> => {
  return pipe(
    map((statuses: EAsyncStatusesCqrs | EAsyncStatusesCqrs[]) =>
      Array.isArray(statuses) ? statuses.includes(statusForCheck) : statuses === statusForCheck,
    ),
  );
};
