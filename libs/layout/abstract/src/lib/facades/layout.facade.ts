import { Injectable } from '@angular/core';
import { injectQuery } from '@showtime/shared/utils';
import { UserQuery } from '@showtime/auth/domain/queries';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';

@Injectable()
export class LayoutFacade {
  private readonly queries = {
    user: injectQuery<void, UserModel>(UserQuery)(false),
  };

  public readonly state: Record<string, IFacadeState> = {
    user: {
      value$: this.queries.user.value$,
    },
  };
}
