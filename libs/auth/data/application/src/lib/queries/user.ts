import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';

import { AuthRepository } from '../../../../domain/repositories/auth.repo';
import { UserModel } from '../../../../domain/models/user.model';

@Injectable()
export class UserQuery extends BaseCqrsQuery<void, UserModel> {
  private authRepository = inject(AuthRepository);

  constructor() {
    super();

    this.value$ = this.authRepository.user$;
  }
}
