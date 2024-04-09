import { EUserRoles } from '../../../../../auth/shared/enums/user-roles.enum';

export interface ILayoutUiMenuItemConfig {
  text: string;
  link: string;
  icon: string;
  roles?: EUserRoles[];
}
