import { inject, Injectable } from '@angular/core';
import { filter } from 'rxjs';

import { BaseCqrsQuery } from '@showtime/shared/utils';
import { AuthRepository } from '@showtime/auth/domain';

@Injectable()
export class IsAuthQuery extends BaseCqrsQuery<null, boolean> {
  private authRepository = inject(AuthRepository);

  constructor() {
    super();

    this.value$ = this.authRepository.isAuthenticated$.pipe(filter(value => value !== undefined));
  }
}
