import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';

export interface IUserUpdatePayload {
  id: string;
  body: Partial<UserModel>;
}
