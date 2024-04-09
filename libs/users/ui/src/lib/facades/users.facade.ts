import { UserModel } from '../../../../data/domain/models/user.model';
import { UserRoleModel } from '../../../../data/domain/models/user-role.model';
import { IAllUsersPayload } from '../../../../data/domain/interfaces/users-all-payload.interface';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { Observable } from 'rxjs';
import { IUsersState } from '../interfaces/users-state.interface';
import { IUsersHandlers } from '../interfaces/users-handlers.interface';

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
