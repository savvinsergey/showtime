import { inject, Injectable } from '@angular/core';
import { AuthUiFacade } from '@showtime/auth/ui/abstract';
import { combineLatest, map, startWith } from 'rxjs';

import { DROPDOWN_USER_DEFAULT_CONFIG } from '../../../constants';
import type { IDropdownUserConfig } from '../../../interfaces';

@Injectable()
export class DropdownUserService {
  public readonly authUiFacade = inject(AuthUiFacade);
  // ----------- //

  public readonly dropdownUserConfig$ = combineLatest([
    this.authUiFacade.state.isAuth$!,
    this.authUiFacade.handlers.login.status$,
  ]).pipe(
    map(
      ([isAuthenticated]) =>
        ({
          showSignOutLink: isAuthenticated,
        } as IDropdownUserConfig),
    ),
    startWith(DROPDOWN_USER_DEFAULT_CONFIG),
  );
}
