import { ILayoutState } from '../interfaces/layout-state.interface';

export abstract class LayoutFacade {
  public abstract readonly state: ILayoutState;
}
