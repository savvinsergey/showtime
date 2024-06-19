import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutUiFacade } from '@showtime/layout/ui/abstract';

import { LAYOUT_UI_CONFIG_TOKEN } from '../../../constants';
import type { ILayoutUiModuleConfig } from '../../../interfaces';

@Component({
  selector: 'st-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  public readonly layoutUiFacade = inject(LayoutUiFacade);
  public readonly moduleConfig: ILayoutUiModuleConfig = inject(LAYOUT_UI_CONFIG_TOKEN);

  // -------------------- //

  public readonly user$ = this.layoutUiFacade.state.user$;
}
