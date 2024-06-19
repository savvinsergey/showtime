import { inject, Injectable } from '@angular/core';
import { UpdateUserCommand, UserQuery } from '@showtime/auth/application';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { injectQuery } from '@showtime/shared/utils';
import {
  AllUsersQuery,
  DeleteCommand,
  GetRolesAllQuery,
  GetRolesByUserQuery,
  UpdateCommand,
  UpdateRolesCommand,
} from '@showtime/users/application';
import type { IAllUsersPayload, UserModel, UserRoleModel } from '@showtime/users/domain';
import type { IUsersUiHandlers, IUsersUiState, UsersUiFacade } from '@showtime/users/ui/abstract';
import type { Observable } from 'rxjs';
import { of, switchMap, take, tap } from 'rxjs';

import type { IUsersUiCommands, IUsersUiQueries } from '../interfaces';

@Injectable()
export class UsersUiFacadeImplementation implements UsersUiFacade {
  private readonly commands: IUsersUiCommands = {
    update: inject(UpdateCommand),
    delete: inject(DeleteCommand),
    updateRoles: inject(UpdateRolesCommand),
    updateUser: inject(UpdateUserCommand),
  };

  private readonly queries: IUsersUiQueries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
    allUsers: injectQuery<IAllUsersPayload, UserModel[]>(AllUsersQuery)(true),
    allRoles: injectQuery<void, UserRoleModel[]>(GetRolesAllQuery)(true),
    userRoles: injectQuery<string, UserRoleModel[]>(GetRolesByUserQuery)(false),
  };

  // ------------------------- //

  public readonly handlers: IUsersUiHandlers = {
    delete: this.commands.delete.metadata,
    update: this.commands.update.metadata,
    updateRoles: this.commands.updateRoles.metadata,
    updateUser: this.commands.updateUser.metadata,
  };

  @SetDefaultStateProperty('value$')
  public readonly state: IUsersUiState = {
    userRoles: {
      ...this.queries.userRoles.metadata,
      value$: this.queries.userRoles.value$,
    },
    allRoles: {
      ...this.queries.allRoles.metadata,
      value$: this.queries.allRoles.value$,
    },
    allUsers: {
      ...this.queries.allUsers.metadata,
      value$: this.queries.allUsers.value$,
    },
    user: {
      value$: this.queries.user.value$,
    },
  };

  // ------------------------- //

  public block({ user_id: id, blocked }: UserModel): Observable<EAsyncStatusesCqrs> {
    const body = { blocked: !blocked };
    const payload = { id, body };

    this.commands.update.execute(payload);
    return this.handlers.update.status$;
  }

  public delete(id: string): Observable<EAsyncStatusesCqrs> {
    this.commands.delete.execute(id);
    return this.handlers.delete.status$;
  }

  public getRoles(id: string) {
    this.queries.userRoles.execute(id);
  }

  public refresh(payload?: IAllUsersPayload) {
    this.queries.allUsers.execute(payload);
  }

  public update(id: string, body: Partial<UserModel>): Observable<EAsyncStatusesCqrs> {
    const payload = { id, body: { user_metadata: body } };

    this.commands.update.execute(payload);

    // prettier-ignore
    return this.handlers.update.status$.pipe(
      switchMap((status: EAsyncStatusesCqrs) =>
        status === EAsyncStatusesCqrs.SUCCESS
          ? this.updateUser(body)
          : of(status),
      ),
    );
  }

  public updateRoles(id: string, checkedRoles: UserRoleModel[]): Observable<EAsyncStatusesCqrs> {
    const roles = checkedRoles.map(role => role.id);
    const payload = { id, roles };

    this.commands.updateRoles.execute(payload);
    return this.handlers.updateRoles.status$;
  }

  private updateUser(body: Partial<UserModel>): Observable<EAsyncStatusesCqrs> {
    return this.state.user$!.pipe(
      take(1),
      tap((user: UserModel) => {
        const updatedUser = { ...user, ...body };
        this.commands.updateUser.execute(updatedUser);
      }),
      switchMap(() => this.handlers.updateUser.status$),
    );
  }
}
