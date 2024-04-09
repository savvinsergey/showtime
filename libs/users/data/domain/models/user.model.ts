import { User } from '@auth0/auth0-angular';
import { UserRoleModel } from './user-role.model';

export interface UserMetadataModel {
  nickname: string;
  birthday: string;
  language: string;
  country: string;
  city: string;
  address: string;
  instagramLink: string;
  facebookLink: string;
}

export interface UserModel extends User {
  roles: UserRoleModel[];
  blocked: boolean;
  logins_count: number;
  last_login: Date;
  created_at: Date;
  user_id: string;
  user_metadata: Partial<UserMetadataModel> | undefined;
  sub: string;
}
