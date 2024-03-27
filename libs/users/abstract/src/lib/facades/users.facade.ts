import { inject, Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';

import { injectQuery } from '@showtime/shared/utils';
import { AllUsersQuery, GetRolesAllQuery, GetRolesByUserQuery, UsersTokenQuery } from '@showtime/users/domain/queries';
import { DeleteCommand, UpdateCommand } from '@showtime/users/domain/commands';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { UpdateRolesCommand } from '@showtime/users/domain/commands';
import { filter, first } from 'rxjs';
import { IRole } from '../../../../ui/src/lib/interfaces/role';
import { IUserRole } from '../../../../domain/src/lib/interfaces/user-roles.interface';
import { IAllUsersPayload } from '../../../../domain/src/lib/interfaces/users-all-payload.interface';
import { UserQuery } from '@showtime/auth/domain/queries';
import { IUsersQueries } from '../interfaces/users-queries.interface';
import { IUsersCommands } from '../interfaces/users-commands.interface';
import { IUsersHandlers } from '../interfaces/users-handlers.interface';
import { IUsersState } from '../interfaces/users-state.interface';
import { SetDefaultStateProperty } from '../../../../../shared/decorators/set-default-state-property.decorator';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly queries: IUsersQueries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
    allUsers: injectQuery<IAllUsersPayload, UserModel[]>(AllUsersQuery)(true),
    allRoles: injectQuery<void, IRole[]>(GetRolesAllQuery)(true),
    userRoles: injectQuery<string, IUserRole[]>(GetRolesByUserQuery)(false),
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

  public updateRoles(id: string, checkedRoles: IRole[]) {
    const roles = checkedRoles.map(role => role.id);
    const payload = { id, roles };

    this.commands.updateRoles.execute(payload);
    return this.handlers.updateRoles.status$;
  }
}
