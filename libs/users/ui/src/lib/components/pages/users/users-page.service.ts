import { inject, Injectable } from '@angular/core';

import { UsersFacade } from '@showtime/users/abstract';
import { combineLatest, map, of } from 'rxjs';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '../../../../../../../shared/operators/check-statuses.operator';

@Injectable()
export class UsersPageService {
  private readonly usersFacade = inject(UsersFacade);

  // -------------------- //

  public readonly inProgress$ = combineLatest({
    loading: this.usersFacade.state['allUsers'].status$!.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
  });

  public readonly refresh$ = combineLatest([
    this.usersFacade.handlers['delete'].status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
    this.usersFacade.handlers['update'].status$.pipe(checkStatuses(EAsyncStatusesCqrs.SUCCESS)),
  ]).pipe(map(([deleting, blocking]) => !!deleting || !!blocking));
}
