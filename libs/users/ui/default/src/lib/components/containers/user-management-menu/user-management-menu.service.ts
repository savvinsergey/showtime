import { inject, Injectable } from '@angular/core';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import type { UserModel } from '@showtime/users/domain';
import type { IUserManagementMenuConfig } from '@showtime/users/ui';
import { UsersUiFacade } from '@showtime/users/ui/abstract';
import type { Observable } from 'rxjs';
import { combineLatest, map, of, startWith } from 'rxjs';

@Injectable()
export class UserManagementMenuService {
  private readonly usersUiFacade = inject(UsersUiFacade);

  // -------------------- //

  private readonly blocking$ = combineLatest([
    this.usersUiFacade.handlers.update.status$,
    this.usersUiFacade.handlers.update.context$!,
  ]).pipe(
    map(([status, context]) => ({
      active: status === EAsyncStatusesCqrs.PENDING,
      context,
    })),
  );

  private readonly deleting$ = combineLatest([
    this.usersUiFacade.handlers.delete.status$,
    this.usersUiFacade.handlers.delete.context$!,
  ]).pipe(
    map(([status, context]) => ({
      active: status === EAsyncStatusesCqrs.PENDING,
      context,
    })),
  );

  private readonly blockingWithContext$ = (user: UserModel) => {
    return this.blocking$.pipe(
      map(({ active, context }) => active && context?.['id'] === user['user_id']),
    );
  };

  private readonly deletingWithContext$ = (user: UserModel) => {
    // prettier-ignore
    return this.deleting$.pipe(
      map(({ active, context }) => active && context === user['user_id'])
    );
  };

  public readonly menuConfig$ = (user: UserModel): Observable<IUserManagementMenuConfig> => {
    return of(user).pipe(
      map((user: UserModel) => ({
        inProgress$: combineLatest([
          this.deletingWithContext$(user),
          this.blockingWithContext$(user),
        ]).pipe(
          map(([deleting, blocking]) => !!deleting || !!blocking),
          startWith(false),
        ),
      })),
    );
  };
}
