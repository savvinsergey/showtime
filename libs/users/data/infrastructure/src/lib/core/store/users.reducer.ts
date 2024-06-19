import type { IAction } from '@showtime/shared/interfaces';
import type { ValueOf } from '@showtime/shared/types';
import type { UserModel, UserRoleModel } from '@showtime/users/domain';

import { EUsersStoreActions, EUsersStoreKeys } from '../../enums';
import type { IUsersStoreState } from '../../interfaces';

export const UsersReducer = <TPayload extends ValueOf<IUsersStoreState>>(
  state: IUsersStoreState,
  action: IAction<TPayload, EUsersStoreActions>,
): IUsersStoreState => {
  const type = action.type;
  const payload = action.payload;

  if (!typeGuards[type]?.(payload)) {
    console.error('Wrong payload type in UsersReducer or typeGuard is not described');
    return state;
  }
  switch (type) {
    case EUsersStoreActions.SET_TOKEN: {
      return { ...state, [EUsersStoreKeys.TOKEN]: payload as string };
    }
    case EUsersStoreActions.SET_ALL_ROLES: {
      return { ...state, [EUsersStoreKeys.ALL_ROLES]: payload as UserRoleModel[] };
    }
    case EUsersStoreActions.SET_ALL_USERS: {
      return { ...state, [EUsersStoreKeys.ALL_USERS]: payload as UserModel[] };
    }
    default: {
      return state;
    }
  }
};

const typeGuards = {
  [EUsersStoreActions.SET_TOKEN]: (payload: ValueOf<IUsersStoreState>): payload is string =>
    typeof payload === 'string',
  [EUsersStoreActions.SET_ALL_USERS]: (
    payload: ValueOf<IUsersStoreState>,
  ): payload is UserModel[] =>
    (Array.isArray(payload) && !!(payload[0] as UserModel)?.user_id) || payload.length === 0,
  [EUsersStoreActions.SET_ALL_ROLES]: (
    payload: ValueOf<IUsersStoreState>,
  ): payload is UserRoleModel[] =>
    (Array.isArray(payload) && !!(payload[0] as UserRoleModel)?.name) || payload.length === 0,
};
