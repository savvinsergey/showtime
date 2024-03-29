import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { InlineSVGModule } from 'ng-inline-svg-2';

import { DropdownUserContainer } from '@showtime/auth/ui';
import { LayoutAbstractModule } from '@showtime/layout/abstract';

import { SidebarMenuItemComponent } from './components/presentational';
import { SidebarComponent, MainLayoutComponent } from './components/containers';
import { LAYOUT_UI_CONFIG_TOKEN } from './constants';
import { ILayoutUiModuleConfig } from './interfaces';
import { CheckAccessDirective } from '../../../../auth/utils/src/lib/directives/check-roles.directive';

@NgModule({
  declarations: [MainLayoutComponent, SidebarComponent, SidebarMenuItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    InlineSVGModule.forRoot(),

    DropdownUserContainer,
    LayoutAbstractModule,
    CheckAccessDirective,
  ],
  exports: [MainLayoutComponent],
})
export class LayoutUiModule {
  public static forRoot(config: ILayoutUiModuleConfig): ModuleWithProviders<LayoutUiModule> {
    return {
      ngModule: LayoutUiModule,
      providers: [
        {
          provide: LAYOUT_UI_CONFIG_TOKEN,
          useValue: config,
        },
      ],
    };
  }
}
