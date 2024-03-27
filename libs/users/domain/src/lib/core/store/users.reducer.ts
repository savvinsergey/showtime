import { IAction } from '@showtime/shared/interfaces';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { IUsersStoreState } from '../../interfaces/users-store-state.interface';
import { ValueOf } from '../../../../../../shared/types/value-of.type';
import { UserModel } from '../../../../../../auth/domain/src/lib/core/models/user.model';
import { IRole } from '../../../../../ui/src/lib/interfaces/role';

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
      return { ...state, [EUsersStoreKeys.ALL_ROLES]: payload as IRole[] };
    }
    case EUsersStoreActions.SET_ALL_USERS: {
      return { ...state, [EUsersStoreKeys.ALL_USERS]: payload as UserModel[] };
    }
    default:
      return state;
  }
};

const typeGuards = {
  [EUsersStoreActions.SET_TOKEN]: (payload: ValueOf<IUsersStoreState>): payload is string =>
    typeof payload === 'string',
  [EUsersStoreActions.SET_ALL_USERS]: (payload: ValueOf<IUsersStoreState>): payload is UserModel[] =>
    Array.isArray(payload) && !!(payload[0] as UserModel)?.user_id,
  [EUsersStoreActions.SET_ALL_ROLES]: (payload: ValueOf<IUsersStoreState>): payload is IRole[] =>
    Array.isArray(payload) && !!(payload[0] as IRole)?.name,
};
