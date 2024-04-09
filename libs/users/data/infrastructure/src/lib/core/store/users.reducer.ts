import { IAction } from 'libs/shared/interfaces';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { IUsersStoreState } from '../../interfaces/users-store-state.interface';
import { ValueOf } from '../../../../../../../shared/types/value-of.type';
import { UserModel } from '../../../../../domain/models/user.model';
import { UserRoleModel } from '../../../../../domain/models/user-role.model';

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
    default:
      return state;
  }
};

const typeGuards = {
  [EUsersStoreActions.SET_TOKEN]: (payload: ValueOf<IUsersStoreState>): payload is string =>
    typeof payload === 'string',
  [EUsersStoreActions.SET_ALL_USERS]: (payload: ValueOf<IUsersStoreState>): payload is UserModel[] =>
    Array.isArray(payload) && !!(payload[0] as UserModel)?.user_id,
  [EUsersStoreActions.SET_ALL_ROLES]: (payload: ValueOf<IUsersStoreState>): payload is UserRoleModel[] =>
    Array.isArray(payload) && !!(payload[0] as UserRoleModel)?.name,
};
