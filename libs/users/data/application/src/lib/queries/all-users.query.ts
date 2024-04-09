import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from 'libs/shared/utils';
import { Observable, tap } from 'rxjs';
import { IAllUsersPayload } from '../../../../domain/interfaces/users-all-payload.interface';
import { UsersRepository } from '../../../../domain/repositories/users.repo';
import { UserModel } from '../../../../domain/models/user.model';

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
