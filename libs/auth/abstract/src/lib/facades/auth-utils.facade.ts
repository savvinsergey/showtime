import { UserQuery } from '@showtime/auth/application';
import type { UserModel } from '@showtime/auth/domain';
import type { AuthUtilsFacade, IAuthUtilsState } from '@showtime/auth/utils/abstract';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';

import type { IAuthUtilsQueries } from '../interfaces';

export class AuthUtilsFacadeImplementation implements AuthUtilsFacade {
  private readonly queries: IAuthUtilsQueries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  // ------------------------- //

  @SetDefaultStateProperty('value$')
  public readonly state: IAuthUtilsState = {
    user: {
      ...this.queries.user.metadata,
      value$: this.queries.user.value$,
    },
  };
}
