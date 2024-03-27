import { inject, Injectable } from '@angular/core';

import { IsAuthQuery, UserQuery } from '@showtime/auth/domain/queries';
import { LoginCommand, LogoutCommand } from '@showtime/auth/domain/commands';

import { injectQuery } from '@showtime/shared/utils';
import { UserModel } from '../../../../domain/src/lib/core/models/user.model';
import { IAuthHandlers } from '../interfaces/auth-handlers.interface';
import { IAuthQueries } from '../interfaces/auth-queries.interface';
import { IAuthCommands } from '../interfaces/auth-commands.interface';
import { IAuthState } from '../interfaces/auth-state.interface';
import { SetDefaultStateProperty } from '../../../../../shared/decorators/set-default-state-property.decorator';

@Injectable()
export class AuthFacade {
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
