import { inject, Injectable } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { AuthFacade } from '@showtime/auth/abstract';
import { IDropdownUserConfig } from '../../../interfaces';
import { DROPDOWN_USER_DEFAULT_CONFIG } from '../../../constants';

@Injectable()
export class DropdownUserService {
  public readonly authFacade = inject(AuthFacade);

  // ----------- //

  public readonly dropdownUserConfig$ = combineLatest([
    this.authFacade.state['isAuth'].value$,
    this.authFacade.handlers['login'].status$,
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
