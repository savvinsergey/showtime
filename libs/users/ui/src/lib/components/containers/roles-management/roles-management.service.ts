import { inject, Injectable } from '@angular/core';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '@showtime/shared/operators';
import type { IRolesManagementConfig } from '@showtime/users/ui';
import { UsersFacade } from '@showtime/users/ui/facade';
import type { Observable } from 'rxjs';
import { combineLatest, filter } from 'rxjs';

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

  public readonly close$: Observable<boolean> = this.updateRolesStatus$!.pipe(
    checkStatuses(EAsyncStatusesCqrs.SUCCESS),
    filter(Boolean),
  );

  public readonly config$: Observable<IRolesManagementConfig> = combineLatest({
    inProgress: this.inProgress$,
  });
}
