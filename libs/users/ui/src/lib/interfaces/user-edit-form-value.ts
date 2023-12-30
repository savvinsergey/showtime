import { UserModel } from '../../../../../auth/domain/src/lib/core/models/user.model';

export interface IUserEditFormValue {
  id: string;
  body: Partial<UserModel>;
}
