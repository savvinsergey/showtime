import type { UserModel } from '@showtime/auth/domain';
import type { IFacadeState } from '@showtime/shared/interfaces';
import type { Observable } from 'rxjs';

export interface ILayoutState {
  user: IFacadeState<UserModel>;

  user$?: Observable<UserModel>;
}
