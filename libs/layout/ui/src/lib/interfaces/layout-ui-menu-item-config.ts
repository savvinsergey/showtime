import { EUserRoles } from '../../../../../auth/domain/src/lib/enums/user-roles.enum';

export interface ILayoutUiMenuItemConfig {
  text: string;
  link: string;
  icon: string;
  roles?: EUserRoles[];
}
