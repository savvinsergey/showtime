import { Injectable } from '@angular/core';
import { UserQuery } from '@showtime/auth/application/queries';
import type { UserModel } from '@showtime/auth/domain';
import type { ILayoutState, LayoutFacade } from '@showtime/layout/ui';
import { SetDefaultStateProperty } from '@showtime/shared/decorators';
import { injectQuery } from '@showtime/shared/utils';

@Injectable()
export class LayoutFacadeImplementation implements LayoutFacade {
  private readonly queries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  @SetDefaultStateProperty('value$')
  public readonly state: ILayoutState = {
    user: {
      value$: this.queries.user.value$,
    },
  };
}
