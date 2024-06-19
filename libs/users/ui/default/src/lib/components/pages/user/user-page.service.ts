import { inject, Injectable } from '@angular/core';
import { SUPPORTED_LANGUAGES } from '@showtime/shared/const';
import { EAsyncStatusesCqrs } from '@showtime/shared/enums';
import { checkStatuses } from '@showtime/shared/operators';
import type { IUserEditFormConfig } from '@showtime/users/ui';
import { UsersUiFacade } from '@showtime/users/ui/abstract';
import type { Observable } from 'rxjs';
import { combineLatest, first, map, of } from 'rxjs';

@Injectable()
export class UserPageService {
  private readonly supportedLanguages = inject(SUPPORTED_LANGUAGES);
  private readonly usersUiFacade = inject(UsersUiFacade);

  // -------------------- //

  private readonly inProgress$ = combineLatest({
    saving: this.usersUiFacade.handlers.update.status$!.pipe(
      checkStatuses(EAsyncStatusesCqrs.PENDING),
    ),
  });
  private readonly isAuth0Provider$ = this.usersUiFacade.state.user$!.pipe(
    first(Boolean),
    map(user => user.sub!.split('|')[0] === 'auth0'),
  );

  // -------------------- //

  public readonly config$: Observable<IUserEditFormConfig> = combineLatest({
    languages: of(this.supportedLanguages),
    inProgress: this.inProgress$,
    isAuth0Provider: this.isAuth0Provider$,
  });
}
