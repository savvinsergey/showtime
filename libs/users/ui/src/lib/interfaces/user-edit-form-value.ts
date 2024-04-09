import { UserModel } from '../../../../data/domain/models/user.model';

export interface IUserEditFormValue {
  id: string;
  body: Partial<UserModel>;
}
