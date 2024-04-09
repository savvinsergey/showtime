import { IFacadeHandler } from '../../../../../shared/interfaces/facade-handler.interface';
import { IUsersUpdateRolesPayload } from '../../../../data/domain/interfaces/users-update-roles-payload.interface';
import { UserModel } from '../../../../data/domain/models/user.model';

export interface IUsersHandlers {
  delete: IFacadeHandler<string>;
  update: IFacadeHandler<Partial<UserModel>>;
  updateRoles: IFacadeHandler<IUsersUpdateRolesPayload>;
}
