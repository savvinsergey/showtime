import { inject, Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';

import { IsAuthQuery, UserQuery } from '@showtime/auth/domain/queries';
import { LoginCommand, LogoutCommand } from '@showtime/auth/domain/commands';

import { injectQuery } from '@showtime/shared/utils';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { IFacadeHandler } from '../../../../../shared/interfaces/facade-handler.interface';
import { UserModel } from '../../../../domain/src/lib/core/models/user.model';

@Injectable()
export class AuthFacade {
  private readonly queries = {
    isAuth: injectQuery<null, boolean>(IsAuthQuery)(true),
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  private readonly commands = {
    login: inject(LoginCommand),
    logout: inject(LogoutCommand),
  };

  // ------------------------- //

  public readonly state: Record<string, IFacadeState> = {
    isAuth: {
      ...this.queries.isAuth.metadata,
      value$: this.queries.isAuth.value$,
    },
    user: {
      ...this.queries.user.metadata,
      value$: this.queries.user.value$,
    },
  };

  public readonly handlers: Record<string, IFacadeHandler> = {
    login: this.commands.login.metadata,
    logout: this.commands.logout.metadata,
  };

  // ------------------------- //

  public login(): void {
    this.commands.login.execute();
  }

  public logout(): void {
    this.commands.logout.execute();
  }
}
