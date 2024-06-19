import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import type { ILayoutUiMenuItemConfig } from '../../../interfaces';

@Component({
  selector: 'st-sidebar-menu-item',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItemComponent {
  @Input()
  public item!: ILayoutUiMenuItemConfig;
}
