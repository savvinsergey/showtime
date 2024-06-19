import type { IFacadeState } from '@showtime/shared/interfaces';
import type { Observable } from 'rxjs';

export interface IUsersUtilsState {
  usersToken: IFacadeState<string>;

  usersToken$?: Observable<string>;
}
