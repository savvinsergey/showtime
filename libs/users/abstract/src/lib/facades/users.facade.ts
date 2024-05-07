import { inject, Injectable } from '@angular/core';

import { IUsersQueries, IUsersCommands } from '../interfaces';

import {
  AllUsersQuery,
  GetRolesAllQuery,
  GetRolesByUserQuery,
  UsersTokenQuery,
} from '@showtime/users/application/queries';
import { DeleteCommand, UpdateCommand, UpdateRolesCommand } from '@showtime/users/application/commands';
import { UserQuery } from '@showtime/auth/application/queries';
import { IAllUsersPayload, UserModel, UserRoleModel } from '@showtime/users/domain';
import { IUsersHandlers, IUsersState } from '@showtime/users/ui';
import { UsersFacade } from '@showtime/users/ui/facade';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';

@Injectable()
export class UsersFacadeImplementation implements UsersFacade {
  private readonly queries: IUsersQueries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
    allUsers: injectQuery<IAllUsersPayload, UserModel[]>(AllUsersQuery)(true),
    allRoles: injectQuery<void, UserRoleModel[]>(GetRolesAllQuery)(true),
    userRoles: injectQuery<string, UserRoleModel[]>(GetRolesByUserQuery)(false),
    usersToken: injectQuery<void, string>(UsersTokenQuery)(true),
  };

  private readonly commands: IUsersCommands = {
    update: inject(UpdateCommand),
    delete: inject(DeleteCommand),
    updateRoles: inject(UpdateRolesCommand),
  };

  // ------------------------- //

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

  public readonly handlers: IUsersHandlers = {
    delete: this.commands.delete.metadata,
    update: this.commands.update.metadata,
    updateRoles: this.commands.updateRoles.metadata,
  };

  // ------------------------- //

  public refresh(payload?: IAllUsersPayload) {
    this.queries.allUsers.execute(payload);
  }

  public getRoles(id: string) {
    this.queries.userRoles.execute(id);
  }

  public delete(id: string) {
    this.commands.delete.execute(id);
    return this.handlers.delete.status$;
  }

  public update(id: string, body: Partial<UserModel>) {
    const payload = { id, body: { user_metadata: body } };

    this.commands.update.execute(payload);
    return this.handlers.update.status$;
  }

  public block({ user_id: id, blocked }: UserModel) {
    const body = { blocked: !blocked };
    const payload = { id, body };

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
