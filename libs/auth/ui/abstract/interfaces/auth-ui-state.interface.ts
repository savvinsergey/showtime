import type { UserModel } from '@showtime/auth/domain';
import type { IFacadeState } from '@showtime/shared/interfaces';
import type { Observable } from 'rxjs';

export interface IAuthUiState {
  isAuth: IFacadeState<boolean>;
  user: IFacadeState<UserModel>;

  isAuth$?: Observable<boolean>;
  user$?: Observable<UserModel>;
}
