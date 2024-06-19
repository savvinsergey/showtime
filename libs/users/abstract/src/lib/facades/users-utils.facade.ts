import { Injectable } from '@angular/core';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';
import { UsersTokenQuery } from '@showtime/users/application';
import type { IUsersUtilsState, UsersUtilsFacade } from '@showtime/users/utils/abstract';

import type { IUsersUtilsQueries } from '../interfaces';

@Injectable()
export class UsersUtilsFacadeImplementation implements UsersUtilsFacade {
  private readonly queries: IUsersUtilsQueries = {
    usersToken: injectQuery<void, string>(UsersTokenQuery)(true),
  };

  // ------------------------- //

  @SetDefaultStateProperty('value$')
  public readonly state: IUsersUtilsState = {
    usersToken: {
      value$: this.queries.usersToken.value$,
    },
  };
}
