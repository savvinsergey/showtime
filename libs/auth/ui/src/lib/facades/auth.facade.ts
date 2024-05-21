import type { IAuthHandlers, IAuthState } from '../interfaces';

export abstract class AuthFacade {
  public abstract readonly handlers: IAuthHandlers;
  public abstract readonly state: IAuthState;

  // ------------------------- //

  public abstract login(): void;
  public abstract logout(): void;
}
