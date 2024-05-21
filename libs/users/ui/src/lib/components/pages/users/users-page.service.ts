import { inject, Injectable } from '@angular/core';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '@showtime/shared/operators';
import { FiltersService } from '@showtime/shared/services';
import type { IAllUsersPayload } from '@showtime/users/domain';
import { UsersFacade } from '@showtime/users/ui/facade';
import type { Observable } from 'rxjs';
import { combineLatest, distinctUntilChanged, filter, map } from 'rxjs';

@Injectable()
export class UsersPageService {
  private readonly filtersService = inject(FiltersService);
  private readonly usersFacade = inject(UsersFacade);

  // -------------------- //

  public readonly inProgress$ = combineLatest({
    loading: this.usersFacade.state.allUsers.status$!.pipe(
      checkStatuses(EAsyncStatusesCqrs.PENDING),
    ),
  });

  public readonly refresh$: Observable<IAllUsersPayload> = combineLatest([
    this.filtersService.filters$,
    this.usersFacade.handlers.delete.status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
    this.usersFacade.handlers.update.status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
  ]).pipe(
    distinctUntilChanged(
      (previous, current) => JSON.stringify(previous) === JSON.stringify(current),
    ),
    filter(
      ([filters, deleting, blocking]) =>
        !!deleting || !!blocking || Object.keys(filters).length > 0,
    ),
    map(([filters]) => this.filtersService.convertToPayload<IAllUsersPayload>(filters)),
  );
}
