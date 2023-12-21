import { inject, Injectable } from '@angular/core';

import { UsersFacade } from '@showtime/users/abstract';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { IRolesManagementConfig } from '../../../interfaces/roles-management-config';
import { checkStatuses } from '../../../../../../../shared/operators/check-statuses.operator';
import { IEventHandler } from '../../../../../../../shared/interfaces/event-handler.interface';

@Injectable()
export class RolesManagementService {
  private readonly usersFacade = inject(UsersFacade);

  // -------------------- //

  private readonly rolesStatuses$ = combineLatest([
    this.usersFacade.state['allRoles'].status$!,
    this.usersFacade.state['userRoles'].status$!,
  ]);

  private readonly updateRolesStatus$ = this.usersFacade.handlers['updateRoles'].status$;

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
