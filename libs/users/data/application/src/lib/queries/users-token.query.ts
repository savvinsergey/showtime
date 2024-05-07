import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { TokenUsersRepository } from '@showtime/users/domain';
import { BaseCqrsQuery } from '@showtime/shared/utils';

@Injectable()
export class UsersTokenQuery extends BaseCqrsQuery<void, string> {
  private readonly tokenUsersRepo = inject(TokenUsersRepository);

  constructor() {
    super();

    this.value$ = this.tokenUsersRepo.token$;
  }

  public override query(): Observable<string> {
    return this.tokenUsersRepo.getToken().pipe(tap((payload: string) => (this.tokenUsersRepo.token = payload)));
  }
}
