import type { IFacadeHandler } from '@showtime/shared/interfaces';
import type { IUsersUpdateRolesPayload, UserModel } from '@showtime/users/domain';

export interface IUsersHandlers {
  delete: IFacadeHandler<string>;
  update: IFacadeHandler<Partial<UserModel>>;
  updateRoles: IFacadeHandler<IUsersUpdateRolesPayload>;
}
