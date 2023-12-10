import { Component, Input } from '@angular/core';
import { ILayoutUiMenuItemConfig } from '../../../interfaces';
import { InlineSVGModule } from 'ng-inline-svg-2';

@Component({
  selector: 'st-sidebar-menu-item',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.scss'],
})
export class SidebarMenuItemComponent {
  @Input() item!: ILayoutUiMenuItemConfig;
}
