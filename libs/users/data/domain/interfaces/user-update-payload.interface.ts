import { UserModel } from '../models/user.model';

export interface IUserUpdatePayload {
  id: string;
  body: Partial<UserModel>;
}
