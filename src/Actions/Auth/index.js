import * as R from 'ramda';
import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import Fetch from '../../Helpers/Fetch';
import ActionTypes from './types';
// import Fetch from '../../Helpers/Fetch';

export const startUserLogin = () => (
  { type: ActionTypes.USER_LOGIN_START }
);

export const userLogedin = user => (
  {
    type: ActionTypes.USER_LOGIN_SUCESS,
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
  { type: ActionTypes.USER_LOGOUT_SUCESS }
);

export const userLogoutFailure = () => (
  { type: ActionTypes.USER_LOGOUT_FAILUR }
);
export const startUserRegistration = () => (
  { type: ActionTypes.USER_REGISTRATION_START }
);

export const userRegistered = () => (
  { type: ActionTypes.USER_REGISTRATION_SUCESS }
);

export const userRegistrationFailure = () => (
  { type: ActionTypes.USER_REGISTRATION_FAILUR }
);

export const login = R.partial(Fetch, ['/login', 'POST']);

export const register = R.partial(Fetch, ['/users', 'POST']);

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

  if (response.error) dispatch(userLoginFailure());

  if (response.token) {
    localStorage.setItem('token', response.token);

    const decoded = await verifytoken(response.token).catch(error => error);
    if (localStorage.getItem('token') && decoded.user) dispatch(userLogedin(decoded.user));
  }
};

export const atemptLogout = () => (dispatch) => {
  dispatch(startUserLogout());
  localStorage.removeItem('token');
  if (!localStorage.getItem('token')) {
    dispatch(userLogedout());
  } else {
    dispatch(userLogoutFailure());
  }
};

export const atemptRegister = data => async (dispatch) => {
  dispatch(startUserRegistration());
  const tempToken = JWT.sign(data, config.JWT_SECRET);

  const response = await register(JSON.stringify({ token: tempToken }));

  if (response.error) dispatch(userRegistrationFailure());

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
  } else {
    dispatch(atemptLogout());
  }
};
