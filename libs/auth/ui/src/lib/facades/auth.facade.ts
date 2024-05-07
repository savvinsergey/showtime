import { IAuthState, IAuthHandlers } from '../interfaces';

export abstract class AuthFacade {
  public abstract readonly state: IAuthState;
  public abstract readonly handlers: IAuthHandlers;

  // ------------------------- //

  public abstract login(): void;
  public abstract logout(): void;
}
