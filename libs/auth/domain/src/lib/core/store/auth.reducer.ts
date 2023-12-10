import type { IAuthStoreState } from '../../interfaces/auth-store-state.interface';
import { EAuthStoreActions } from '../../enums/auth-store-actions.enum';
import { IAction } from '@showtime/shared/interfaces';
import { EAuthStoreKeys } from '../../enums/auth-store-keys.enum';

export const AuthReducer = (state: IAuthStoreState, action: IAction<any, EAuthStoreActions>): IAuthStoreState => {
  switch (action.type) {
    case EAuthStoreActions.SET_USER: {
      return { ...state, [EAuthStoreKeys.USER]: action.payload };
    }
    default:
      return state;
  }
};
