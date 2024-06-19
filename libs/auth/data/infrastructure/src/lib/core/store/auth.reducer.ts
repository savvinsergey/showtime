import type { IAction } from '@showtime/shared/interfaces';
import type { ValueOf } from '@showtime/shared/types';
import type { UserModel } from '@showtime/users/domain';

import { EAuthStoreActions, EAuthStoreKeys } from '../../enums';
import type { IAuthStoreState } from '../../interfaces';

export const AuthReducer = <TPayload extends ValueOf<IAuthStoreState>>(
  state: IAuthStoreState,
  action: IAction<TPayload, EAuthStoreActions>,
): IAuthStoreState => {
  const type = action.type;
  const payload = action.payload;

  if (!typeGuards[type]?.(payload)) {
    console.error('Wrong payload type in UserReducer or typeGuard is not described');
    return state;
  }
  switch (type) {
    case EAuthStoreActions.SET_USER: {
      return { ...state, [EAuthStoreKeys.USER]: payload as UserModel };
    }
    default: {
      return state;
    }
  }
};

const typeGuards = {
  [EAuthStoreActions.SET_USER]: (payload: ValueOf<IAuthStoreState>): payload is UserModel =>
    !!payload?.sub,
};
