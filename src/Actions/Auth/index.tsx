import { Dispatch } from 'redux';
import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import { Fetch, Response } from '../../Helpers/Fetch';
import * as ActionTypes from './types';
import { atemptSetMessage, SetMessage } from '../Message';
import {
  toggleLoginModal, toggleMenu, ToggleLoginModal, ToggleMenu,
} from '../Modal';
import * as Auth from '../../Helpers/Auth';
import {
  invalidEmail, invalidPassword, invalidUsername, invalidPasswordConfirmation,
} from '../../Helpers/Validation';
import { User } from '../../Models/User';

interface UserLoginStart {
  type: ActionTypes.USER_LOGIN_START;
}

export const startUserLogin = (): UserLoginStart => (
  { type: ActionTypes.USER_LOGIN_START }
);

interface UserLoginSuccess {
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

interface UserRegistrationStart {
  type: ActionTypes.USER_REGISTRATION_START;
}

export const startUserRegistration = (): UserRegistrationStart => (
  { type: ActionTypes.USER_REGISTRATION_START }
);

interface UserRegistrationSuccess {
  type: ActionTypes.USER_REGISTRATION_SUCCESS;
}

export const userRegistered = (): UserRegistrationSuccess => (
  { type: ActionTypes.USER_REGISTRATION_SUCCESS }
);

interface UserRegistrationFailure {
  type: ActionTypes.USER_REGISTRATION_FAILUR;
}

export const userRegistrationFailure = (): UserRegistrationFailure => (
  { type: ActionTypes.USER_REGISTRATION_FAILUR }
);

export type UserRegistrationAction = UserRegistrationStart | UserRegistrationSuccess | UserRegistrationFailure;

export interface GetSelfSuccess {
  type: ActionTypes.GET_SELF_SUCCESS;
  user: User;
}

export const gottSelf = (user: User): GetSelfSuccess => ({
  type: ActionTypes.GET_SELF_SUCCESS,
  user,
});

export interface IsLogedIn {
  type: ActionTypes.IS_LOGED_IN;
  user: User;
}

export const isLogedIn = (user: User): IsLogedIn => ({
  type: ActionTypes.IS_LOGED_IN,
  user,
});

export const login = (token: string): Promise<Response> => Fetch('/login', 'POST', token);

export const register = (token: string): Promise<Response> => Fetch('/users', 'POST', token);

export const getSelf = (): Promise<Response> => Fetch('/me', 'GET', {});

type ValidateAction = (dispatch: Dispatch<SetMessage>) => boolean;

export const validUsername = (username: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidUsername(username)) {
    atemptSetMessage({ text: 'Please select a username', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validEmail = (email: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidEmail(email)) {
    atemptSetMessage({ text: 'Please enter a valid email address', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validPassword = (password: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidPassword(password)) {
    atemptSetMessage({ text: 'Passwords must be atleast 8 characters long', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validPasswordConfirmation = (password: string, passwordConfirmation: string): ValidateAction => (
  dispatch: Dispatch<SetMessage>,
): boolean => {
  if (invalidPasswordConfirmation(password, passwordConfirmation)) {
    atemptSetMessage({ text: 'Passwordconfirmation does not match', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export interface UserData {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export const validUserData = ({
  email, username, password, passwordConfirmation,
}: UserData): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => (
  validEmail(email)(dispatch)
  && validUsername(username)(dispatch)
  && validPassword(password)(dispatch)
  && validPasswordConfirmation(password, passwordConfirmation)(dispatch)
);

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

type AtemptLogoutAction = (dispatch: Dispatch<UserLogoutAction|SetMessage|ToggleMenu>) => void;

export const atemptLogout = (): AtemptLogoutAction => (
  dispatch: Dispatch<UserLogoutAction|SetMessage|ToggleMenu>,
): void => {
  dispatch(startUserLogout());
  Auth.removeToken();
  if (Auth.logedout()) {
    dispatch(userLogedout());
    dispatch(toggleMenu());
    atemptSetMessage({ text: 'You have been logedout', type: 'warning' })(dispatch);
  } else {
    dispatch(userLogoutFailure());
    atemptSetMessage({ text: 'logout failed', type: 'error' })(dispatch);
  }
};

type AtemptRegisterAction =(
  dispatch: Dispatch<UserRegistrationAction|SetMessage|UserLoginSuccess>
) => Promise<void>;

export const atemptRegister = (data: UserData): AtemptRegisterAction => async (
  dispatch: Dispatch<UserRegistrationAction|SetMessage|UserLoginSuccess>,
): Promise<void> => {
  if (validUserData(data)(dispatch)) {
    dispatch(startUserRegistration());
    const tempToken = JWT.sign(data, config.JWT_SECRET);

    const response = await register(JSON.stringify({ token: tempToken })).catch(error => error);

    if (response.message === 'Failed to fetch') {
      atemptSetMessage(
        {
          text: 'unable to connect to resource pleas check your internet conection',
          type: 'error',
        },
      )(dispatch);
    }

    if (response.error) {
      dispatch(userRegistrationFailure());
      const text: string = response.message ? response.message : response.error.errmsg;

      atemptSetMessage({ text, type: 'warning' })(dispatch);
    }

    if (response.token) {
      Auth.setToken(response.token);
      dispatch(userRegistered());
      const decoded = await Auth.verifytoken(response.token).catch(error => error);
      if (Auth.getToken() && decoded.user) dispatch(userLogedin(decoded.user));
    }
  }
};

type CheckIfLogedInAction = (dispatch: Dispatch<IsLogedIn|UserLogoutSuccess>) => Promise<void>

export const checkIfLogedIn = (): CheckIfLogedInAction => async (
  dispatch: Dispatch<IsLogedIn|UserLogoutSuccess>,
): Promise<void> => {
  const token = Auth.getToken();

  if (token) {
    const decoded = await Auth.verifytoken(token).catch(error => error);
    if (decoded.user) {
      dispatch(isLogedIn(decoded.user));
    } else if (Auth.logedout()) {
      dispatch(userLogedout());
    }
  }
};

export type AtemptGetSelfAction = (dispatch: Dispatch<GetSelfSuccess|SetMessage>) => Promise<void>;

export const atemptGetSelf = (): AtemptGetSelfAction => async (
  dispatch: Dispatch<GetSelfSuccess|SetMessage>,
): Promise<void> => {
  const response = await getSelf();

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    const text = response.message ? response.message : response.error.errmsg;

    atemptSetMessage({ text, type: 'warning' })(dispatch);
  }
  if (response.user) dispatch(gottSelf(response.user));
};

export type AuthActions = UserLoginAction | UserLogoutAction | UserRegistrationAction | GetSelfSuccess | IsLogedIn;
