import { IUsersUpdateRolesPayload, UserModel } from '@showtime/users/domain';
import { IFacadeHandler } from '@showtime/shared/interfaces';

export interface IUsersHandlers {
  delete: IFacadeHandler<string>;
  update: IFacadeHandler<Partial<UserModel>>;
  updateRoles: IFacadeHandler<IUsersUpdateRolesPayload>;
}
