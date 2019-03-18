import { Dispatch } from 'redux';
import JWT from 'jsonwebtoken';
import * as ActionTypes from './types';
import { atemptSetMessage, SetMessage } from '../../Message';
import { toggleLoginModal, ToggleLoginModal } from '../../Modal';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { validEmail, validPassword } from '../Validation';
import config from '../../../Config/config';
import * as Auth from '../../../Helpers/Auth';
import { User } from '../../../Models/User';

interface UserLoginStart {
  type: ActionTypes.USER_LOGIN_START;
}

export const startUserLogin = (): UserLoginStart => (
  { type: ActionTypes.USER_LOGIN_START }
);

export interface UserLoginSuccess {
  type: ActionTypes.USER_LOGIN_SUCCESS;
  user: User;
}

export const userLogedin = (user: User): UserLoginSuccess => (
  {
    type: ActionTypes.USER_LOGIN_SUCCESS,
    user,
  }
);

interface UserLoginFailure {
  type: ActionTypes.USER_LOGIN_FAILUR;
}

export const userLoginFailure = (): UserLoginFailure => (
  { type: ActionTypes.USER_LOGIN_FAILUR }
);

export type UserLoginAction = UserLoginStart | UserLoginSuccess | UserLoginFailure;

export const login = (token: string): Promise<Response> => Fetch('/login', 'POST', token);

interface LoginData {
  email: string;
  password: string;
}

type AtemptLoginAction = (
  dispatch: Dispatch<UserLoginAction | SetMessage | ToggleLoginModal>
) => Promise<void>

export const atemptLogin = (data: LoginData): AtemptLoginAction => async (
  dispatch: Dispatch<UserLoginAction | SetMessage | ToggleLoginModal>,
): Promise<void> => {
  if (validEmail(data.email)(dispatch) && validPassword(data.password)(dispatch)) {
    dispatch(startUserLogin());

    const tempToken = JWT.sign(data, config.JWT_SECRET);

    const response = await login(JSON.stringify({ token: tempToken })).catch(error => error);

    if (response.message === 'Failed to fetch') {
      atemptSetMessage(
        {
          text: 'unable to connect to resource pleas check your internet conection',
          type: 'error',
        },
      )(dispatch);
    }

    if (response.error) {
      dispatch(userLoginFailure());
      atemptSetMessage({ text: response.error.errmsg, type: 'warning' })(dispatch);
    }

    if (response.token) {
      Auth.setToken(response.token);

      const decoded = await Auth.verifytoken(response.token).catch(error => error);
      if (Auth.getToken() && decoded.user) {
        dispatch(userLogedin(decoded.user));
        dispatch(toggleLoginModal());
        atemptSetMessage({ text: 'You are now logedin', type: 'success' })(dispatch);
      }
    }
  }
};