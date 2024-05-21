import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import type { IAllUsersPayload, UserModel } from '@showtime/users/domain';
import { UsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
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
