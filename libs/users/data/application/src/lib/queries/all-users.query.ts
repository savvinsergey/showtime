import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { IAllUsersPayload, UserModel, UsersRepository } from '@showtime/users/domain';
import { BaseCqrsQuery } from '@showtime/shared/utils';
@Injectable()
export class AllUsersQuery extends BaseCqrsQuery<IAllUsersPayload, UserModel[]> {
  private readonly usersRepository = inject(UsersRepository);

  constructor() {
    super();

    this.value$ = this.usersRepository.allUsers$;
  }

  public override query(payload?: IAllUsersPayload): Observable<UserModel[]> {
    return this.usersRepository
      .getAll(payload)
      .pipe(tap((payload: UserModel[]) => (this.usersRepository.allUsers = payload)));
  }
}
