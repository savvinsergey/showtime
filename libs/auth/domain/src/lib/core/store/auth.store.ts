import { Injectable } from '@angular/core';
import { BaseStore } from '@showtime/shared/utils';
import { AuthReducer } from './auth.reducer';
import { IAuthStoreState } from '../../interfaces/auth-store-state.interface';
import { EAuthStoreKeys } from '../../enums/auth-store-keys.enum';
import { EAuthStoreActions } from '../../enums/auth-store-actions.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends BaseStore<IAuthStoreState, EAuthStoreActions> {
  constructor() {
    super(AuthReducer, {
      [EAuthStoreKeys.USER]: null,
    });
  }
}
