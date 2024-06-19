import { CommonModule } from '@angular/common';
import type { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DropdownUserContainer } from '@showtime/auth/ui';
import { AuthUtilsModule } from '@showtime/auth/utils';
import { LayoutAbstractModule } from '@showtime/layout/abstract';
import { LayoutUiFacade } from '@showtime/layout/ui/abstract';
import { OnDemandPreloadDirective } from '@showtime/shared/directives';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { MainLayoutComponent, SidebarComponent } from './components/containers';
import { SidebarMenuItemComponent } from './components/presentational';
import { LAYOUT_UI_CONFIG_TOKEN } from './constants';
import type { ILayoutUiModuleConfig } from './interfaces';

@NgModule({
  declarations: [MainLayoutComponent, SidebarComponent, SidebarMenuItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    InlineSVGModule.forRoot(),

    LayoutAbstractModule.forFeature({ provideTo: LayoutUiFacade }),
    AuthUtilsModule,
    DropdownUserContainer,
    OnDemandPreloadDirective,
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
