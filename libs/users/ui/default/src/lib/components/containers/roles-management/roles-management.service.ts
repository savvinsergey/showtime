import { inject, Injectable } from '@angular/core';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '@showtime/shared/operators';
import type { IRolesManagementConfig } from '@showtime/users/ui';
import { UsersUiFacade } from '@showtime/users/ui/abstract';
import type { Observable } from 'rxjs';
import { combineLatest, filter } from 'rxjs';

@Injectable()
export class RolesManagementService {
  private readonly usersUiFacade = inject(UsersUiFacade);

  // -------------------- //

  private readonly rolesStatuses$ = combineLatest([
    this.usersUiFacade.state.allRoles.status$!,
    this.usersUiFacade.state.userRoles.status$!,
  ]);

  private readonly updateRolesStatus$ = this.usersUiFacade.handlers.updateRoles.status$;

  private readonly inProgress$ = combineLatest({
    loading: this.rolesStatuses$.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
    assigning: this.updateRolesStatus$!.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
  });

  // -------------------- //

  public readonly close$: Observable<boolean> = this.updateRolesStatus$!.pipe(
    checkStatuses(EAsyncStatusesCqrs.SUCCESS),
    filter(Boolean),
  );

  public readonly defaultConfig: IRolesManagementConfig = {
    inProgress: {
      loading: false,
      assigning: false,
    },
  };
  public readonly config$: Observable<IRolesManagementConfig> = combineLatest({
    inProgress: this.inProgress$,
  });
}
