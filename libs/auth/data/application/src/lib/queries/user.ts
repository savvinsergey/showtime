import { inject, Injectable } from '@angular/core';
import type { UserModel } from '@showtime/auth/domain';
import { AuthRepository } from '@showtime/auth/domain';
import { BaseCqrsQuery } from '@showtime/shared/utils';

@Injectable()
export class UserQuery extends BaseCqrsQuery<void, UserModel> {
  private readonly authRepository = inject(AuthRepository);

  constructor() {
    super();

    this.value$ = this.authRepository.user$;
  }
}
