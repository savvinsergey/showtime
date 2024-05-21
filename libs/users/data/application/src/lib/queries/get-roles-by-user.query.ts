import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import type { UserRoleModel } from '@showtime/users/domain';
import { UsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable()
export class GetRolesByUserQuery extends BaseCqrsQuery<string, UserRoleModel[]> {
  private readonly usersRepository = inject(UsersRepository);

  constructor() {
    super();
  }

  public override query(id: string): Observable<UserRoleModel[]> {
    return this.usersRepository
      .getRoles(id)
      .pipe(tap((result: UserRoleModel[]) => (this.value = result)));
  }
}
