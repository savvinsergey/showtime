import type { IAuthUiHandlers, IAuthUiState } from '../interfaces';

export abstract class AuthUiFacade {
  public abstract readonly handlers: IAuthUiHandlers;
  public abstract readonly state: IAuthUiState;

  // ------------------------- //

  public abstract login(): void;
  public abstract logout(): void;
}
