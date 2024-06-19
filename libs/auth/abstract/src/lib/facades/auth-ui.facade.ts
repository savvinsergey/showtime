import { inject } from '@angular/core';
import { IsAuthQuery, LoginCommand, LogoutCommand, UserQuery } from '@showtime/auth/application';
import type { UserModel } from '@showtime/auth/domain';
import type { AuthUiFacade, IAuthUiHandlers, IAuthUiState } from '@showtime/auth/ui/abstract';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';

import type { IAuthUiCommands, IAuthUiQueries } from '../interfaces';

export class AuthUiFacadeImplementation implements AuthUiFacade {
  private readonly commands: IAuthUiCommands = {
    login: inject(LoginCommand),
    logout: inject(LogoutCommand),
  };

  private readonly queries: IAuthUiQueries = {
    isAuth: injectQuery<null, boolean>(IsAuthQuery)(true),
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  // ------------------------- //

  public readonly handlers: IAuthUiHandlers = {
    login: this.commands.login.metadata,
    logout: this.commands.logout.metadata,
  };

  @SetDefaultStateProperty('value$')
  public readonly state: IAuthUiState = {
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
