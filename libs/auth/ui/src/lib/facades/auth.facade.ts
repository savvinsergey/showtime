import { IAuthState } from '../interfaces/auth-state.interface';
import { IAuthHandlers } from '../interfaces/auth-handlers.interface';

export abstract class AuthFacade {
  public abstract readonly state: IAuthState;
  public abstract readonly handlers: IAuthHandlers;

  // ------------------------- //

  public abstract login(): void;
  public abstract logout(): void;
}
