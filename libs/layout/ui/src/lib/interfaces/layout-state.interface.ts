import { Observable } from 'rxjs';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { UserModel } from '../../../../../auth/data/domain/models/user.model';

export interface ILayoutState {
  user: IFacadeState<UserModel>;

  user$?: Observable<UserModel>;
}
