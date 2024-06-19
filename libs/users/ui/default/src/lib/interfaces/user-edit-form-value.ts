import type { UserModel } from '@showtime/users/domain';

export interface IUserEditFormValue {
  id: string;
  body: Partial<UserModel>;
}
