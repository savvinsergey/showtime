import { Injectable } from '@angular/core';
import { BaseStore } from '@showtime/shared/utils';

import type { EUsersStoreActions } from '../../enums';
import { EUsersStoreKeys } from '../../enums';
import type { IUsersStoreState } from '../../interfaces';
import { UsersReducer } from './users.reducer';

@Injectable({
  providedIn: 'root',
})
export class UsersStore extends BaseStore<IUsersStoreState, EUsersStoreActions> {
  constructor() {
    super(UsersReducer, {
      [EUsersStoreKeys.TOKEN]: '',
      [EUsersStoreKeys.ALL_ROLES]: [],
      [EUsersStoreKeys.ALL_USERS]: [],
    });
  }
}
