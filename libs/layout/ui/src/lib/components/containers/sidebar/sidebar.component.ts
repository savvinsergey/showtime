import { Component, inject, Inject } from '@angular/core';
import { LAYOUT_UI_CONFIG_TOKEN } from '../../../constants';
import { ILayoutUiModuleConfig } from '@showtime/layout/ui';

@Component({
  selector: 'st-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public moduleConfig: ILayoutUiModuleConfig = inject(LAYOUT_UI_CONFIG_TOKEN);
}
