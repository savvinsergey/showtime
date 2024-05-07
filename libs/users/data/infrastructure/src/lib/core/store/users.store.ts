import { Injectable } from '@angular/core';

import { UsersReducer } from './users.reducer';
import { IUsersStoreState } from '../../interfaces';
import { EUsersStoreActions, EUsersStoreKeys } from '../../enums';

import { BaseStore } from '@showtime/shared/utils';

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
