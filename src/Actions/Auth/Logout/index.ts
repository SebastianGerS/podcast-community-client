import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { attemptSetMessage, SetMessage } from '../../Message';
import { toggleMenu, ToggleMenu } from '../../Modal';
import * as Auth from '../../../Helpers/Auth';

interface UserLogoutStart {
  type: ActionTypes.USER_LOGOUT_START;
}

export const startUserLogout = (): UserLogoutStart => (
  { type: ActionTypes.USER_LOGOUT_START }
);

export interface UserLogoutSuccess {
  type: ActionTypes.USER_LOGOUT_SUCCESS;
}

export const userLogedout = (): UserLogoutSuccess => (
  { type: ActionTypes.USER_LOGOUT_SUCCESS }
);

interface UserLogoutFailure {
  type: ActionTypes.USER_LOGOUT_FAILUR;
}

export const userLogoutFailure = (): UserLogoutFailure => (
  { type: ActionTypes.USER_LOGOUT_FAILUR }
);

export type UserLogoutAction = UserLogoutStart | UserLogoutSuccess | UserLogoutFailure;

type AttemptLogoutAction = (dispatch: Dispatch<UserLogoutAction|SetMessage|ToggleMenu>) => void;

export const attemptLogout = (): AttemptLogoutAction => (
  dispatch: Dispatch<UserLogoutAction|SetMessage|ToggleMenu>,
): void => {
  dispatch(startUserLogout());
  Auth.removeToken();
  if (Auth.logedout()) {
    dispatch(userLogedout());
    dispatch(toggleMenu());
    attemptSetMessage({ text: 'You have been logedout', type: 'warning' })(dispatch);
  } else {
    dispatch(userLogoutFailure());
    attemptSetMessage({ text: 'logout failed', type: 'error' })(dispatch);
  }
};
