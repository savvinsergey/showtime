import { Observable } from 'rxjs';

import { IFacadeState } from '@showtime/shared/interfaces';
import { UserModel } from '@showtime/auth/domain';

export interface IAuthState {
  isAuth: IFacadeState<boolean>;
  user: IFacadeState<UserModel>;

  isAuth$?: Observable<boolean>;
  user$?: Observable<UserModel>;
}
