import { Injectable } from '@angular/core';
import { BaseStore } from '@showtime/shared/utils';
import { UsersReducer } from './users.reducer';
import { IUsersStoreState } from '../../interfaces/users-store-state.interface';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';

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
