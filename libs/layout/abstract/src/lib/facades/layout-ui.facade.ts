import { Injectable } from '@angular/core';
import { UserQuery } from '@showtime/auth/application';
import type { UserModel } from '@showtime/auth/domain';
import type { ILayoutUiState, LayoutUiFacade } from '@showtime/layout/ui/abstract';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';

import type { ILayoutUiQueries } from '../interfaces';

@Injectable()
export class LayoutUiFacadeImplementation implements LayoutUiFacade {
  private readonly queries: ILayoutUiQueries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  @SetDefaultStateProperty('value$')
  public readonly state: ILayoutUiState = {
    user: {
      value$: this.queries.user.value$,
    },
  };
}
