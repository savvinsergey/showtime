import { inject, Injectable } from '@angular/core';
import { Auth0Api } from '../../core/api/auth0.api';
import { BaseCqrsCommand } from '@showtime/shared/utils';
import { Observable } from 'rxjs';

@Injectable()
export class LoginCommand extends BaseCqrsCommand<null, void> {
  private auth0Api = inject(Auth0Api);

  public command(): Observable<void> {
    return this.auth0Api.login();
  }
}
