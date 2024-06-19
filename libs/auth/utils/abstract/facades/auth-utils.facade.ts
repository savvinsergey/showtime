import type { IAuthUtilsState } from '../interfaces';

export abstract class AuthUtilsFacade {
  public abstract readonly state: IAuthUtilsState;
}
