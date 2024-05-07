import { inject } from '@angular/core';

import { IAuthQueries, IAuthCommands } from '../interfaces';

import { injectQuery } from '@showtime/shared/utils';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { UserModel } from '@showtime/auth/domain';
import { IAuthState, IAuthHandlers } from '@showtime/auth/ui';
import { AuthFacade } from '@showtime/auth/ui/facade';
import { IsAuthQuery, UserQuery } from '@showtime/auth/application/queries';
import { LoginCommand, LogoutCommand } from '@showtime/auth/application/commands';

export class AuthFacadeImplementation implements AuthFacade {
  private readonly queries: IAuthQueries = {
    isAuth: injectQuery<null, boolean>(IsAuthQuery)(true),
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  private readonly commands: IAuthCommands = {
    login: inject(LoginCommand),
    logout: inject(LogoutCommand),
  };

  // ------------------------- //

  @SetDefaultStateProperty('value$')
  public readonly state: IAuthState = {
    isAuth: {
      ...this.queries.isAuth.metadata,
      value$: this.queries.isAuth.value$,
    },
    user: {
      ...this.queries.user.metadata,
      value$: this.queries.user.value$,
    },
  };

  public readonly handlers: IAuthHandlers = {
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
