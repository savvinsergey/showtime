import { Observable } from 'rxjs';

import { IFacadeState } from '@showtime/shared/interfaces';
import { UserModel } from '@showtime/auth/domain';

export interface ILayoutState {
  user: IFacadeState<UserModel>;

  user$?: Observable<UserModel>;
}
