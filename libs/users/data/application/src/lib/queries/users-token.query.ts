import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import { TokenUsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable()
export class UsersTokenQuery extends BaseCqrsQuery<void, string> {
  private readonly tokenUsersRepository = inject(TokenUsersRepository);

  constructor() {
    super();

    this.value$ = this.tokenUsersRepository.token$;
  }

  public override query(): Observable<string> {
    return this.tokenUsersRepository
      .getToken()
      .pipe(tap((payload: string) => (this.tokenUsersRepository.token = payload)));
  }
}
