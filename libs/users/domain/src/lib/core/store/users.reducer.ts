import { IAction } from '@showtime/shared/interfaces';
import { EUsersStoreActions } from '../../enums/users-store-actions.enum';
import { EUsersStoreKeys } from '../../enums/users-store-keys.enum';
import { IUsersStoreState } from '../../interfaces/users-store-state.interface';

export const UsersReducer = (state: IUsersStoreState, action: IAction<any, EUsersStoreActions>): IUsersStoreState => {
  switch (action.type) {
    case EUsersStoreActions.SET_TOKEN: {
      return { ...state, [EUsersStoreKeys.TOKEN]: action.payload };
    }
    case EUsersStoreActions.SET_ALL_ROLES: {
      return { ...state, [EUsersStoreKeys.ALL_ROLES]: action.payload };
    }
    case EUsersStoreActions.SET_ALL_USERS: {
      return { ...state, [EUsersStoreKeys.ALL_USERS]: action.payload };
    }
    case EUsersStoreActions.SET_SELECTED_USER: {
      return { ...state, [EUsersStoreKeys.SELECTED_USER]: action.payload };
    }
    default:
      return state;
  }
};
