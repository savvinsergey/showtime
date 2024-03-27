import { IFacadeHandler } from '../../../../../shared/interfaces/facade-handler.interface';

export interface IAuthHandlers {
  login: IFacadeHandler<null>;
  logout: IFacadeHandler<null>;
}
