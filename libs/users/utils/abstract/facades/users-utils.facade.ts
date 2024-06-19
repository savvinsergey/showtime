import { IUsersUtilsState } from '../interfaces';

export abstract class UsersUtilsFacade {
  public abstract readonly state: IUsersUtilsState;
}
