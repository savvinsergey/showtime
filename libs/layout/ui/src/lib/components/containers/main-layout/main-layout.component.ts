import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LAYOUT_UI_CONFIG_TOKEN } from '../../../constants';
import { LayoutFacade } from '../../../facades';
import { ILayoutUiModuleConfig } from '../../../interfaces';

@Component({
  selector: 'st-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  public readonly moduleConfig: ILayoutUiModuleConfig = inject(LAYOUT_UI_CONFIG_TOKEN);
  public readonly layoutFacade = inject(LayoutFacade);

  // -------------------- //

  public readonly user$ = this.layoutFacade.state.user$;
}
