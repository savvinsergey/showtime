import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { Observable } from 'rxjs';

export interface IAuthState {
  isAuth: IFacadeState<boolean>;
  user: IFacadeState<UserModel>;

  isAuth$?: Observable<boolean>;
  user$?: Observable<UserModel>;
}
