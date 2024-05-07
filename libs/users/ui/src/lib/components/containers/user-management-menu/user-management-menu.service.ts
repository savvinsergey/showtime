import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, startWith } from 'rxjs';

import { IUserManagementMenuConfig } from '@showtime/users/ui';
import { UserModel } from '@showtime/users/domain';
import { UsersFacade } from '@showtime/users/ui/facade';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';

@Injectable()
export class UserManagementMenuService {
  private readonly usersFacade = inject(UsersFacade);

  // -------------------- //

  public readonly menuConfig$ = (user: UserModel): Observable<IUserManagementMenuConfig> => {
    return of(user).pipe(
      map((user: UserModel) => ({
        inProgress$: combineLatest([this.deletingWithContext$(user), this.blockingWithContext$(user)]).pipe(
          map(([deleting, blocking]) => !!deleting || !!blocking),
          startWith(false),
        ),
      })),
    );
  };

  private readonly deleting$ = combineLatest([
    this.usersFacade.handlers.delete.status$,
    this.usersFacade.handlers.delete.context$!,
  ]).pipe(
    map(([status, context]) => ({
      active: status === EAsyncStatusesCqrs.PENDING,
      context,
    })),
  );

  private readonly blocking$ = combineLatest([
    this.usersFacade.handlers.update.status$,
    this.usersFacade.handlers.update.context$!,
  ]).pipe(
    map(([status, context]) => ({
      active: status === EAsyncStatusesCqrs.PENDING,
      context,
    })),
  );

  private readonly deletingWithContext$ = (user: UserModel) => {
    return this.deleting$.pipe(map(({ active, context }) => active && context === user['user_id']));
  };

  private readonly blockingWithContext$ = (user: UserModel) => {
    return this.blocking$.pipe(map(({ active, context }) => active && context?.['id'] === user['user_id']));
  };
}
