import { Observable } from 'rxjs';

import { IUsersHandlers, IUsersState } from '../interfaces';

import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { IAllUsersPayload, UserModel, UserRoleModel } from '@showtime/users/domain';

export abstract class UsersFacade {
  public abstract readonly state: IUsersState;
  public abstract readonly handlers: IUsersHandlers;

  // ------------------------- //

  public abstract refresh(payload?: IAllUsersPayload): void;
  public abstract getRoles(id: string): void;
  public abstract delete(id: string): Observable<EAsyncStatusesCqrs>;
  public abstract update(id: string, body: Partial<UserModel>): Observable<EAsyncStatusesCqrs>;
  public abstract block(user: UserModel): Observable<EAsyncStatusesCqrs>;
  public abstract updateRoles(id: string, checkedRoles: UserRoleModel[]): Observable<EAsyncStatusesCqrs>;
}
