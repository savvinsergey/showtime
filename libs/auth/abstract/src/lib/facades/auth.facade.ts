import { inject } from '@angular/core';
import { LoginCommand, LogoutCommand } from '@showtime/auth/application/commands';
import { IsAuthQuery, UserQuery } from '@showtime/auth/application/queries';
import type { UserModel } from '@showtime/auth/domain';
import type { IAuthHandlers, IAuthState } from '@showtime/auth/ui';
import type { AuthFacade } from '@showtime/auth/ui/facade';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';

import type { IAuthCommands, IAuthQueries } from '../interfaces';

export class AuthFacadeImplementation implements AuthFacade {
  private readonly commands: IAuthCommands = {
    login: inject(LoginCommand),
    logout: inject(LogoutCommand),
  };

  private readonly queries: IAuthQueries = {
    isAuth: injectQuery<null, boolean>(IsAuthQuery)(true),
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  // ------------------------- //

  public readonly handlers: IAuthHandlers = {
    login: this.commands.login.metadata,
    logout: this.commands.logout.metadata,
  };

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

  // ------------------------- //

  public login(): void {
    this.commands.login.execute();
  }

  public logout(): void {
    this.commands.logout.execute();
  }
}
