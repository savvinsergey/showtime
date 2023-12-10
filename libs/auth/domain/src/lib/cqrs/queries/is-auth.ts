import { inject, Injectable, Injector } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import { Auth0Api } from '../../core/api/auth0.api';
import { filter } from 'rxjs';

@Injectable()
export class IsAuthQuery extends BaseCqrsQuery<null, boolean> {
  private auth0Api = inject(Auth0Api);

  constructor() {
    super();

    this.value$ = this.auth0Api.isAuthenticated$.pipe(filter(value => value !== undefined));
  }
}
