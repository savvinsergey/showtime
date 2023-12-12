import { inject, Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';

import { injectQuery } from '@showtime/shared/utils';
import { AllUsersQuery, GetRolesAllQuery, GetRolesByUserQuery, UsersTokenQuery } from '@showtime/users/domain/queries';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { DeleteCommand, UpdateCommand } from '@showtime/users/domain/commands';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IFacadeHandler } from '../../../../../shared/interfaces/facade-handler.interface';
import { UpdateRolesCommand } from '../../../../domain/src/lib/cqrs/commands/update-roles.command';
import { filter, first } from 'rxjs';
import { IRole } from '../../../../ui/src/lib/interfaces/role';
import { IUserRole } from '../../../../domain/src/lib/interfaces/user-roles.interface';
import { IAllUsersPayload } from '../../../../domain/src/lib/interfaces/users-all-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly queries: Record<string, any> = {
    allUsers: injectQuery<IAllUsersPayload, User[]>(AllUsersQuery)(true),
    allRoles: injectQuery<void, string[]>(GetRolesAllQuery)(true),
    userRoles: injectQuery<string, IUserRole[]>(GetRolesByUserQuery)(false),
    usersToken: injectQuery<void, string>(UsersTokenQuery)(true),
  };

  private readonly commands = {
    update: inject(UpdateCommand),
    delete: inject(DeleteCommand),
    updateRoles: inject(UpdateRolesCommand),
  };

  // ------------------------- //

  public readonly state: Record<string, IFacadeState> = {
    usersToken: {
      value$: this.queries['usersToken'].value$,
    },
    userRoles: {
      ...this.queries['userRoles'].metadata,
      value$: this.queries['userRoles'].value$,
    },
    allRoles: {
      ...this.queries['allRoles'].metadata,
      value$: this.queries['allRoles'].value$,
    },
    allUsers: {
      ...this.queries['allUsers'].metadata,
      value$: this.queries['allUsers'].value$,
    },
  };

  public readonly handlers: Record<string, IFacadeHandler> = {
    delete: this.commands.delete.metadata,
    update: this.commands.update.metadata,
    updateRoles: this.commands.updateRoles.metadata,
  };

  // ------------------------- //

  public readonly allRoles$ = this.state['allRoles'].value$.pipe(first(_ => !!_?.length));
  public readonly userRoles$ = this.state['userRoles'].value$.pipe(filter(_ => !!_?.length));

  // ------------------------- //

  public refresh(payload?: IAllUsersPayload) {
    this.queries['allUsers'].execute(payload);
  }

  public getRoles(id: string) {
    this.queries['userRoles'].execute(id);
  }

  public delete(id: string) {
    this.commands.delete.execute(id);
    return this.handlers['delete'].status$;
  }

  public block({ user_id: id, blocked }: UserModel) {
    const body = { blocked: !blocked };
    const payload = { id, body };

    this.commands.update.execute(payload);
    return this.handlers['update'].status$;
  }

  public updateRoles(id: string, checkedRoles: IRole[]) {
    const roles = checkedRoles.map(role => role.id);
    const payload = { id, roles };

    this.commands.updateRoles.execute(payload);
    return this.handlers['updateRoles'].status$;
  }
}
