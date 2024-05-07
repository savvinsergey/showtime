import { inject, Injectable } from '@angular/core';

import { BaseCqrsQuery } from '@showtime/shared/utils';
import { AuthRepository, UserModel } from '@showtime/auth/domain';

@Injectable()
export class UserQuery extends BaseCqrsQuery<void, UserModel> {
  private authRepository = inject(AuthRepository);

  constructor() {
    super();

    this.value$ = this.authRepository.user$;
  }
}
