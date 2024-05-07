import { IFacadeHandler } from '@showtime/shared/interfaces';

export interface IAuthHandlers {
  login: IFacadeHandler<null>;
  logout: IFacadeHandler<null>;
}
