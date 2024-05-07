import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LAYOUT_UI_CONFIG_TOKEN } from '../../../constants';
import { ILayoutUiModuleConfig } from '../../../interfaces';

@Component({
  selector: 'st-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public moduleConfig: ILayoutUiModuleConfig = inject(LAYOUT_UI_CONFIG_TOKEN);
}
