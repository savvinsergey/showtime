import { IFacadeHandler } from '../../../../../shared/interfaces/facade-handler.interface';
import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';
import { IUsersUpdateRolesPayload } from '../../../../domain/src/lib/interfaces/users-update-roles-payload.interface';

export interface IUsersHandlers {
  delete: IFacadeHandler<string>;
  update: IFacadeHandler<Partial<UserModel>>;
  updateRoles: IFacadeHandler<IUsersUpdateRolesPayload>;
}
