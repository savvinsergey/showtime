import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';

import { Observable, tap } from 'rxjs';

import { IUserRole } from '../../interfaces/user-roles.interface';
import { UsersApi } from '../../core/api/users.api';

@Injectable()
export class GetRolesByUserQuery extends BaseCqrsQuery<string, IUserRole[]> {
  private readonly usersApi = inject(UsersApi);

  constructor() {
    super();
  }

  public override query(id: string): Observable<IUserRole[]> {
    return this.usersApi.getRoles(id).pipe(tap((result: IUserRole[]) => (this.value = result)));
  }
}
