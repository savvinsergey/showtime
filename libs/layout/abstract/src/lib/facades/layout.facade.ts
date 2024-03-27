import { Injectable } from '@angular/core';
import { injectQuery } from '@showtime/shared/utils';
import { UserQuery } from '@showtime/auth/domain/queries';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { SetDefaultStateProperty } from '../../../../../shared/decorators/set-default-state-property.decorator';
import { IUsersState } from '../../../../../users/abstract/src/lib/interfaces/users-state.interface';
import { ILayoutState } from '../interfaces/layout-state.interface';

@Injectable()
export class LayoutFacade {
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
