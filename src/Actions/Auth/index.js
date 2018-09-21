import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import { Fetch } from '../../Helpers/Fetch';
import ActionTypes from './types';
import { atemptSetMessage } from '../Message';
import { toggleLoginModal, toggleMenu } from '../Modal';
import * as Auth from '../../Helpers/Auth';

export const startUserLogin = () => (
  { type: ActionTypes.USER_LOGIN_START }
);

export const userLogedin = user => (
  {
    type: ActionTypes.USER_LOGIN_SUCCESS,
    user,
  }
);

export const userLoginFailure = () => (
  { type: ActionTypes.USER_LOGIN_FAILUR }
);
export const startUserLogout = () => (
  { type: ActionTypes.USER_LOGOUT_START }
);

export const userLogedout = () => (
  { type: ActionTypes.USER_LOGOUT_SUCCESS }
);

export const userLogoutFailure = () => (
  { type: ActionTypes.USER_LOGOUT_FAILUR }
);
export const startUserRegistration = () => (
  { type: ActionTypes.USER_REGISTRATION_START }
);

export const userRegistered = () => (
  { type: ActionTypes.USER_REGISTRATION_SUCCESS }
);

export const userRegistrationFailure = () => (
  { type: ActionTypes.USER_REGISTRATION_FAILUR }
);

export const gottSelf = user => ({
  type: ActionTypes.GET_SELF_SUCCESS,
  user,
});

export const login = token => Fetch('/login', 'POST', token);

export const register = token => Fetch('/users', 'POST', token);

export const getSelf = () => Fetch('/me', 'GET', {});

export const atemptLogin = data => async (dispatch) => {
  dispatch(startUserLogin());

  const tempToken = JWT.sign(data, config.JWT_SECRET);

  const response = await login(JSON.stringify({ token: tempToken })).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ message: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(userLoginFailure());
    dispatch(atemptSetMessage({ message: response.error.errmsg, type: 'warning' }));
  }

  if (response.token) {
    Auth.setToken(response.token);

    const decoded = await Auth.verifytoken(response.token).catch(error => error);
    if (Auth.getToken() && decoded.user) {
      dispatch(userLogedin(decoded.user));
      dispatch(toggleLoginModal());
      dispatch(atemptSetMessage({ message: 'You are now logedin', type: 'success' }));
    }
  }
};

export const atemptLogout = () => (dispatch) => {
  dispatch(startUserLogout());
  Auth.removeToken();
  if (Auth.logedout()) {
    dispatch(userLogedout());
    dispatch(toggleMenu());
    dispatch(atemptSetMessage({ message: 'You have been logedout', type: 'warning' }));
  } else {
    dispatch(userLogoutFailure());
    dispatch(atemptSetMessage({ message: 'logout failed', type: 'error' }));
  }
};


export const atemptRegister = data => async (dispatch) => {
  dispatch(startUserRegistration());
  const tempToken = JWT.sign(data, config.JWT_SECRET);

  const response = await register(JSON.stringify({ token: tempToken })).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ message: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(userRegistrationFailure());
    const message = response.message ? response.message : response.error.errmsg;

    dispatch(atemptSetMessage({ message, type: 'warning' }));
  }

  if (response.token) {
    Auth.setToken(response.token);
    dispatch(userRegistered());
    const decoded = await Auth.verifytoken(response.token).catch(error => error);
    if (Auth.getToken() && decoded.user) dispatch(userLogedin(decoded.user));
  }
};

export const checkIfLogedIn = () => async (dispatch) => {
  const token = Auth.getToken();

  const decoded = await Auth.verifytoken(token).catch(error => error);
  if (decoded.user) {
    dispatch(userLogedin(decoded.user));
  } else if (Auth.logedout()) {
    dispatch(userLogedout());
  }
};

export const atemptGetSelf = () => async (dispatch) => {
  const response = await getSelf();

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ message: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    const message = response.message ? response.message : response.error.errmsg;

    dispatch(atemptSetMessage({ message, type: 'warning' }));
  }

  if (response.user) dispatch(gottSelf(response.user));
};
