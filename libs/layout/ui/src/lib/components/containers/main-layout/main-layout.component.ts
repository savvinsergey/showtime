import { Component, inject } from '@angular/core';
import { LAYOUT_UI_CONFIG_TOKEN } from '../../../constants';
import { ILayoutUiModuleConfig } from '@showtime/layout/ui';
import { AuthFacade } from '@showtime/auth/abstract';
import { DropdownUserService } from '../../../../../../../auth/ui/src/lib/components/containers/dropdown-user/dropdown-user.service';
import { LayoutFacade } from '@showtime/layout/abstract';

@Component({
  selector: 'st-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  public readonly moduleConfig: ILayoutUiModuleConfig = inject(LAYOUT_UI_CONFIG_TOKEN);
  public readonly layoutFacade = inject(LayoutFacade);

  // -------------------- //

  public readonly user$ = this.layoutFacade.state['user'].value$;
}
