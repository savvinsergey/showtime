import { inject, Injectable } from '@angular/core';
import { combineLatest, filter, Observable } from 'rxjs';

import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { IRolesManagementConfig } from '@showtime/users/ui';
import { checkStatuses } from '@showtime/shared/operators';
import { UsersFacade } from '@showtime/users/ui/facade';

@Injectable()
export class RolesManagementService {
  private readonly usersFacade = inject(UsersFacade);

  // -------------------- //

  private readonly rolesStatuses$ = combineLatest([
    this.usersFacade.state.allRoles.status$!,
    this.usersFacade.state.userRoles.status$!,
  ]);

  private readonly updateRolesStatus$ = this.usersFacade.handlers.updateRoles.status$;

  private readonly inProgress$ = combineLatest({
    loading: this.rolesStatuses$.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
    assigning: this.updateRolesStatus$!.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
  });

  // -------------------- //

  public readonly config$: Observable<IRolesManagementConfig> = combineLatest({
    inProgress: this.inProgress$,
  });

  public readonly close$: Observable<boolean> = this.updateRolesStatus$!.pipe(
    checkStatuses(EAsyncStatusesCqrs.SUCCESS),
    filter(Boolean),
  );
}
