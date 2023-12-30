import { inject, Injectable } from '@angular/core';

import { UsersFacade } from '@showtime/users/abstract';
import { combineLatest, first, map, Observable, of, tap } from 'rxjs';
import { IUserEditFormConfig } from '../../../interfaces/user-edit-form-config';
import { SUPPORTED_LANGUAGES } from '../../../../../../../shared/constants/supported-languages.const';
import { checkStatuses } from '../../../../../../../shared/operators/check-statuses.operator';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';

@Injectable()
export class UserPageService {
  private readonly usersFacade = inject(UsersFacade);
  private readonly supportedLanguages = inject(SUPPORTED_LANGUAGES);

  // -------------------- //

  private readonly inProgress$ = combineLatest({
    saving: this.usersFacade.handlers['update'].status$!.pipe(checkStatuses(EAsyncStatusesCqrs.PENDING)),
  });

  private readonly isAuth0Provider$ = this.usersFacade.state['user'].value$.pipe(
    first(Boolean),
    map(user => user.sub.split('|')[0] === 'auth0'),
  );

  // -------------------- //

  public readonly config$: Observable<IUserEditFormConfig> = combineLatest({
    languages: of(this.supportedLanguages),
    inProgress: this.inProgress$,
    isAuth0Provider: this.isAuth0Provider$,
  });
}
