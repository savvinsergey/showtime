import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from 'libs/shared/utils';
import { Observable, tap } from 'rxjs';
import { TokenUsersRepository } from '../../../../domain/repositories/token.repo';

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
