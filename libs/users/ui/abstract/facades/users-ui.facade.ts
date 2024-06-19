import type { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import type { IAllUsersPayload, UserModel, UserRoleModel } from '@showtime/users/domain';
import type { Observable } from 'rxjs';

import type { IUsersUiHandlers, IUsersUiState } from '../interfaces';

export abstract class UsersUiFacade {
  public abstract readonly handlers: IUsersUiHandlers;
  public abstract readonly state: IUsersUiState;

  // ------------------------- //

  public abstract delete(id: string): Observable<EAsyncStatusesCqrs>;
  public abstract getRoles(id: string): void;
  public abstract block(user: UserModel): Observable<EAsyncStatusesCqrs>;
  public abstract refresh(payload?: IAllUsersPayload): void;

  // prettier-ignore
  public abstract updateRoles(id: string, checkedRoles: UserRoleModel[]): Observable<EAsyncStatusesCqrs>;
  public abstract update(id: string, body: Partial<UserModel>): Observable<EAsyncStatusesCqrs>;
}
