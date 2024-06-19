import type { IFacadeHandler } from '@showtime/shared/interfaces';

export interface IAuthUiHandlers {
  login: IFacadeHandler<null>;
  logout: IFacadeHandler<null>;
}
