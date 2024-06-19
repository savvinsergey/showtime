import { inject, Injectable } from '@angular/core';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '@showtime/shared/operators';
import { FiltersService } from '@showtime/shared/services';
import type { IAllUsersPayload } from '@showtime/users/domain';
import { UsersUiFacade } from '@showtime/users/ui/abstract';
import type { Observable } from 'rxjs';
import { combineLatest, filter, map, merge, startWith, take, withLatestFrom } from 'rxjs';

@Injectable()
export class UsersPageService {
  private readonly filtersService = inject(FiltersService);
  private readonly usersUiFacade = inject(UsersUiFacade);

  // -------------------- //

  private readonly refreshAllUsers$ = this.usersUiFacade.state.allUsers.value$.pipe(
    take(1),
    map(value => !!value?.length),
  );

  // -------------------- //

  public readonly inProgress$ = combineLatest({
    loading: this.usersUiFacade.state.allUsers.status$!.pipe(
      checkStatuses(EAsyncStatusesCqrs.PENDING),
    ),
  });

  public readonly refresh$: Observable<IAllUsersPayload> = merge(
    this.filtersService.filters$,
    this.refreshAllUsers$,
    this.usersUiFacade.handlers.delete.status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
    this.usersUiFacade.handlers.update.status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
  ).pipe(
    filter(value => !!value),
    withLatestFrom(this.filtersService.filters$.pipe(startWith({}))),
    map(([, filters]) => this.filtersService.convertToPayload<IAllUsersPayload>(filters)),
  );
}
