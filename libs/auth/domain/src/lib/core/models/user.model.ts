import { IUserRole } from '../../../../../../users/domain/src/lib/interfaces/user-roles.interface';
import { User } from '@auth0/auth0-angular';

export interface UserModel extends User {
  roles: IUserRole[];
  blocked: boolean;
  last_login: Date;
  user_id: string;
}
