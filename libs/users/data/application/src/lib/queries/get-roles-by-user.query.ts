import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { UserRoleModel, UsersRepository } from '@showtime/users/domain';
import { BaseCqrsQuery } from '@showtime/shared/utils';

@Injectable()
export class GetRolesByUserQuery extends BaseCqrsQuery<string, UserRoleModel[]> {
  private readonly usersRepository = inject(UsersRepository);

  constructor() {
    super();
  }

  public override query(id: string): Observable<UserRoleModel[]> {
    return this.usersRepository.getRoles(id).pipe(tap((result: UserRoleModel[]) => (this.value = result)));
  }
}
