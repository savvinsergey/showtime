import { inject, Injectable } from '@angular/core';
import { BaseCqrsQuery } from '@showtime/shared/utils';

import { Observable, tap } from 'rxjs';

import { RolesUsersApi } from '../../core/api/roles.api';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { UsersStore } from '../../core/store/users.store';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';
import { IRole } from '../../../../../ui/src/lib/interfaces/role';
import { IUsersStoreState } from '../../interfaces/users-store-state.interface';

@Injectable()
export class GetRolesAllQuery extends BaseCqrsQuery<void, IUsersStoreState[EUsersStoreKeys.ALL_ROLES]> {
  private readonly rolesUsersApi = inject(RolesUsersApi);
  private readonly usersStore = inject(UsersStore);

  constructor() {
    super();

    this.value$ = this.usersStore.select(EUsersStoreKeys.ALL_ROLES);
  }

  public override query(): Observable<IRole[]> {
    return this.rolesUsersApi.getAll().pipe(
      tap((payload: IRole[]) =>
        this.usersStore.dispatch<IUsersStoreState[EUsersStoreKeys.ALL_ROLES]>({
          type: EUsersStoreActions.SET_ALL_ROLES,
          payload,
        }),
      ),
    );
  }
}
