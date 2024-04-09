import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from 'libs/shared/utils';

import { Observable, tap } from 'rxjs';

import { UsersRepository } from '../../../../domain/repositories/users.repo';
import { UserRoleModel } from '../../../../domain/models/user-role.model';

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
