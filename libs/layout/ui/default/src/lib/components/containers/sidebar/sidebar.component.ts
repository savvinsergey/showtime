import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LAYOUT_UI_CONFIG_TOKEN } from '../../../constants';
import type { ILayoutUiModuleConfig } from '../../../interfaces';

@Component({
  selector: 'st-sidebar-c',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public readonly moduleConfig: ILayoutUiModuleConfig = inject(LAYOUT_UI_CONFIG_TOKEN);
}
