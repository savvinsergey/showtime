import { UserModel } from '../models';

export interface IUserUpdatePayload {
  id: string;
  body: Partial<UserModel>;
}
