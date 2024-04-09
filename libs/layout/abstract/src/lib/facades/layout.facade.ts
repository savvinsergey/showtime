import { Injectable } from '@angular/core';
import { injectQuery } from '@showtime/shared/utils';
import { UserQuery } from '@showtime/auth/application/queries';
import { SetDefaultStateProperty } from '../../../../../shared/decorators/set-default-state-property.decorator';
import { ILayoutState } from '../../../../ui/src/lib/interfaces/layout-state.interface';
import { UserModel } from '../../../../../auth/data/domain/models/user.model';
import { LayoutFacade } from '../../../../ui/src/lib/facades/layout.facade';

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
