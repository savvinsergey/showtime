import { EUserRoles } from '@showtime/auth/shared';

export interface ILayoutUiMenuItemConfig {
  text: string;
  link: string;
  icon: string;
  roles?: EUserRoles[];
}
