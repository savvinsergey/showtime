import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '@showtime/auth/domain';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import { filter } from 'rxjs';

@Injectable()
export class IsAuthQuery extends BaseCqrsQuery<null, boolean> {
  private readonly authRepository = inject(AuthRepository);

  constructor() {
    super();

    // prettier-ignore
    this.value$ = this.authRepository.isAuthenticated$
      .pipe(filter(value => value !== undefined));
  }
}
