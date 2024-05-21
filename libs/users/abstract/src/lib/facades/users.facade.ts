import { inject, Injectable } from '@angular/core';
import { UserQuery } from '@showtime/auth/application/queries';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';
import {
  DeleteCommand,
  UpdateCommand,
  UpdateRolesCommand,
} from '@showtime/users/application/commands';
import {
  AllUsersQuery,
  GetRolesAllQuery,
  GetRolesByUserQuery,
  UsersTokenQuery,
} from '@showtime/users/application/queries';
import type { IAllUsersPayload, UserModel, UserRoleModel } from '@showtime/users/domain';
import type { IUsersHandlers, IUsersState } from '@showtime/users/ui';
import type { UsersFacade } from '@showtime/users/ui/facade';

import type { IUsersCommands, IUsersQueries } from '../interfaces';

@Injectable()
export class UsersFacadeImplementation implements UsersFacade {
  private readonly commands: IUsersCommands = {
    update: inject(UpdateCommand),
    delete: inject(DeleteCommand),
    updateRoles: inject(UpdateRolesCommand),
  };

  private readonly queries: IUsersQueries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
    allUsers: injectQuery<IAllUsersPayload, UserModel[]>(AllUsersQuery)(true),
    allRoles: injectQuery<void, UserRoleModel[]>(GetRolesAllQuery)(true),
    userRoles: injectQuery<string, UserRoleModel[]>(GetRolesByUserQuery)(false),
    usersToken: injectQuery<void, string>(UsersTokenQuery)(true),
  };

  // ------------------------- //

  public readonly handlers: IUsersHandlers = {
    delete: this.commands.delete.metadata,
    update: this.commands.update.metadata,
    updateRoles: this.commands.updateRoles.metadata,
  };

  @SetDefaultStateProperty('value$')
  public readonly state: IUsersState = {
    usersToken: {
      value$: this.queries.usersToken.value$,
    },
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

  public block({ user_id: id, blocked }: UserModel) {
    const body = { blocked: !blocked };
    const payload = { id, body };

    this.commands.update.execute(payload);
    return this.handlers.update.status$;
  }

  public delete(id: string) {
    this.commands.delete.execute(id);
    return this.handlers.delete.status$;
  }

  public getRoles(id: string) {
    this.queries.userRoles.execute(id);
  }

  public refresh(payload?: IAllUsersPayload) {
    this.queries.allUsers.execute(payload);
  }

  public update(id: string, body: Partial<UserModel>) {
    const payload = { id, body: { user_metadata: body } };

    this.commands.update.execute(payload);
    return this.handlers.update.status$;
  }

  public updateRoles(id: string, checkedRoles: UserRoleModel[]) {
    const roles = checkedRoles.map(role => role.id);
    const payload = { id, roles };

    this.commands.updateRoles.execute(payload);
    return this.handlers.updateRoles.status$;
  }
}
