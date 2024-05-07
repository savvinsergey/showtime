import { Injectable } from '@angular/core';

import { ILayoutState } from '@showtime/layout/ui';
import { LayoutFacade } from '@showtime/layout/ui/facade';
import { UserQuery } from '@showtime/auth/application/queries';
import { UserModel } from '@showtime/auth/domain';
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
