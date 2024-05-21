import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';
import type { UserRoleModel } from '@showtime/users/domain';
import { RolesUsersRepository } from '@showtime/users/domain';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

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
