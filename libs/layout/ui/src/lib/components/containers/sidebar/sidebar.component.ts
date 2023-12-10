import { Component, inject, Inject } from '@angular/core';
import { LAYOUT_UI_CONFIG_TOKEN } from '../../../constants';
import { ILayoutUiModuleConfig } from '@showtime/layout/ui';
import { UsersApi } from '../../../../../../../users/domain/src/lib/core/api/users.api';
import { AuthFacade } from '@showtime/auth/abstract';
import { CheckAccessDirective } from '../../../../../../../auth/utils/src/lib/directives/check-roles.directive';
@Component({
  selector: 'st-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public moduleConfig: ILayoutUiModuleConfig = inject(LAYOUT_UI_CONFIG_TOKEN);
}
