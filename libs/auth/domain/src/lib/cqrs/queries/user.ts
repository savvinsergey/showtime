import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';

import { Auth0Api } from '../../core/api/auth0.api';
import { User } from '@auth0/auth0-angular';
import { UserModel } from '../../core/models/user.model';

@Injectable()
export class UserQuery extends BaseCqrsQuery<void, UserModel> {
  private auth0Api = inject(Auth0Api);

  constructor() {
    super();

    this.value$ = this.auth0Api.user$;
  }
}
