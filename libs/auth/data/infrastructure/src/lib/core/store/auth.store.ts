import { Injectable } from '@angular/core';
import { BaseStore } from '@showtime/shared/utils';

import type { EAuthStoreActions } from '../../enums';
import { EAuthStoreKeys } from '../../enums';
import type { IAuthStoreState } from '../../interfaces';
import { AuthReducer } from './auth.reducer';

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
