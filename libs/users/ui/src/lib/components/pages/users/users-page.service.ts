import { inject, Injectable } from '@angular/core';

import { UsersFacade } from '@showtime/users/abstract';
import { combineLatest, map, Observable } from 'rxjs';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '../../../../../../../shared/operators/check-statuses.operator';
import { FiltersService } from '../../../../../../../shared/services/filters.service';
import { IAllUsersPayload } from '../../../../../../domain/src/lib/interfaces/users-all-payload.interface';
import { IEventHandler } from '../../../../../../../shared/interfaces/event-handler.interface';

@Injectable()
export class UsersPageService {
  private readonly usersFacade = inject(UsersFacade);
  private readonly filtersService = inject(FiltersService);

  // -------------------- //

  public readonly inProgress$ = combineLatest({
    loading: this.usersFacade.state['allUsers'].status$!.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
  });

  public readonly refresh$: Observable<IEventHandler<IAllUsersPayload>> = combineLatest([
    this.usersFacade.handlers['delete'].status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
    this.usersFacade.handlers['update'].status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
    this.filtersService.filters$,
  ]).pipe(
    map(([deleting, blocking, filters]) => ({
      value: !!deleting || !!blocking || !!filters,
      context: this.filtersService.convertToPayload<IAllUsersPayload>(filters),
    })),
  );
}
