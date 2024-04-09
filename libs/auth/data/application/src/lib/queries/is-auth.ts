import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import { filter } from 'rxjs';
import { AuthRepository } from '../../../../domain/repositories/auth.repo';

@Injectable()
export class IsAuthQuery extends BaseCqrsQuery<null, boolean> {
  private authRepository = inject(AuthRepository);

  constructor() {
    super();

    this.value$ = this.authRepository.isAuthenticated$.pipe(filter(value => value !== undefined));
  }
}
