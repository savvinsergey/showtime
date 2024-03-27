import { inject, Injectable } from '@angular/core';

import { UsersFacade } from '@showtime/users/abstract';
import { combineLatest, distinctUntilChanged, filter, map, Observable, startWith, tap } from 'rxjs';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '../../../../../../../shared/operators/check-statuses.operator';
import { FiltersService } from '../../../../../../../shared/services/filters.service';
import { IAllUsersPayload } from '../../../../../../domain/src/lib/interfaces/users-all-payload.interface';

@Injectable()
export class UsersPageService {
  private readonly usersFacade = inject(UsersFacade);
  private readonly filtersService = inject(FiltersService);

  // -------------------- //

  public readonly inProgress$ = combineLatest({
    loading: this.usersFacade.state.allUsers.status$!.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
  });

  public readonly refresh$: Observable<IAllUsersPayload> = combineLatest([
    this.filtersService.filters$,
    this.usersFacade.handlers.delete.status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
    this.usersFacade.handlers.update.status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
  ]).pipe(
    distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)),
    filter(([filters, deleting, blocking]) => !!deleting || !!blocking || !!Object.keys(filters).length),
    map(([filters]) => this.filtersService.convertToPayload<IAllUsersPayload>(filters)),
  );
}
