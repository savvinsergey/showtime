import { inject, Injectable } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';

import { IDropdownUserConfig } from '../../../interfaces';
import { DROPDOWN_USER_DEFAULT_CONFIG } from '../../../constants';
import { AuthFacade } from '../../../facades';

@Injectable()
export class DropdownUserService {
  public readonly authFacade = inject(AuthFacade);

  // ----------- //

  public readonly dropdownUserConfig$ = combineLatest([
    this.authFacade.state.isAuth$!,
    this.authFacade.handlers.login.status$,
  ]).pipe(
    map(
      ([isAuthenticated, loginStatus]) =>
        ({
          showSignOutLink: isAuthenticated,
        } as IDropdownUserConfig),
    ),
    startWith(DROPDOWN_USER_DEFAULT_CONFIG),
  );
}
