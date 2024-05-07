import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { RolesUsersRepository, UserRoleModel } from '@showtime/users/domain';
import { BaseCqrsQuery } from '@showtime/shared/utils';

@Injectable()
export class GetRolesAllQuery extends BaseCqrsQuery<void, UserRoleModel[]> {
  private readonly rolesUsersRepository = inject(RolesUsersRepository);

  constructor() {
    super();

    this.value$ = this.rolesUsersRepository.allRoles$;
  }

  public override query(): Observable<UserRoleModel[]> {
    return this.rolesUsersRepository
      .getAll()
      .pipe(tap((payload: UserRoleModel[]) => (this.rolesUsersRepository.allRoles = payload)));
  }
}
