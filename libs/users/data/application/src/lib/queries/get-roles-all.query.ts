import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from 'libs/shared/utils';

import { Observable, tap } from 'rxjs';

import { RolesUsersRepository } from '../../../../domain/repositories/roles.repo';
import { UserRoleModel } from '../../../../domain/models/user-role.model';

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
