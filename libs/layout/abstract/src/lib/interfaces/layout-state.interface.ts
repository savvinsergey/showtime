import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IFacadeState } from '../../../../../shared/interfaces/facade-state.interface';
import { Observable } from 'rxjs';

export interface ILayoutState {
  user: IFacadeState<UserModel>;

  user$?: Observable<UserModel>;
}
