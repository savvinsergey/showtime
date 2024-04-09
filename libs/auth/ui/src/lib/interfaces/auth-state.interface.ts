import { Observable } from 'rxjs';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { UserModel } from '../../../../data/domain/models/user.model';

export interface IAuthState {
  isAuth: IFacadeState<boolean>;
  user: IFacadeState<UserModel>;

  isAuth$?: Observable<boolean>;
  user$?: Observable<UserModel>;
}
