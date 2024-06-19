import type { ILayoutUiState } from '../interfaces';

export abstract class LayoutUiFacade {
  public abstract readonly state: ILayoutUiState;
}
