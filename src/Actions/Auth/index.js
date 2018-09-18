import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import Fetch from '../../Helpers/Fetch';
import ActionTypes from './types';
import { atemptSetMessage } from '../Message';
import { toggleLoginModal } from '../Modal';
import { logout } from '../../Helpers/Auth';

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

export const login = token => Fetch('/login', 'POST', token);

export const register = token => Fetch('/users', 'POST', token);

async function verifytoken(token) {
  const response = await new Promise(async (resolve, reject) => {
    JWT.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  return response;
}

export const atemptLogin = data => async (dispatch) => {
  dispatch(startUserLogin());

  const tempToken = JWT.sign(data, config.JWT_SECRET);

  const response = await login(JSON.stringify({ token: tempToken }));

  if (response.error) {
    dispatch(userLoginFailure());
    dispatch(atemptSetMessage({ message: response.error.errmsg, type: 'warning' }));
  }

  if (response.token) {
    localStorage.setItem('token', response.token);

    const decoded = await verifytoken(response.token).catch(error => error);
    if (localStorage.getItem('token') && decoded.user) {
      dispatch(userLogedin(decoded.user));
      dispatch(toggleLoginModal());
      dispatch(atemptSetMessage({ message: 'You are now logedin', type: 'success' }));
    }
  }
};

export const atemptLogout = () => (dispatch) => {
  dispatch(startUserLogout());
  localStorage.removeItem('token');
  if (logout()) {
    dispatch(userLogedout());
    dispatch(atemptSetMessage({ message: 'You have been logedout', type: 'warning' }));
  } else {
    dispatch(userLogoutFailure());
    dispatch(atemptSetMessage({ message: 'logout failed', type: 'error' }));
  }
};


export const atemptRegister = data => async (dispatch) => {
  dispatch(startUserRegistration());
  const tempToken = JWT.sign(data, config.JWT_SECRET);

  const response = await register(JSON.stringify({ token: tempToken }));

  if (response.error) {
    dispatch(userRegistrationFailure());

    const message = response.message ? response.message : response.error.errmsg;

    dispatch(atemptSetMessage({ message, type: 'warning' }));
  }

  if (response.token) {
    dispatch(userRegistered());
    localStorage.setItem('token', response.token);
    const decoded = await verifytoken(response.token).catch(error => error);
    if (localStorage.getItem('token') && decoded.user) dispatch(userLogedin(decoded.user));
  }
};

export const checkIfLogedIn = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  const decoded = await verifytoken(token).catch(error => error);
  if (decoded.user) {
    dispatch(userLogedin(decoded.user));
  } else if (logout) {
    dispatch(userLogedout());
  }
};
