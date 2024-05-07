import { ILayoutState } from '../interfaces';

export abstract class LayoutFacade {
  public abstract readonly state: ILayoutState;
}
