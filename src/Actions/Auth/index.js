import ActionTypes from './types';

export const startUserLogin = () => (
  { type: ActionTypes.USER_LOGIN_START }
);

export const userLogedin = () => (
  { type: ActionTypes.USER_LOGIN_SUCESS }
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

export const atemptLogin = data => (dispatch) => {
  dispatch(startUserLogin());

  if (data) {
    dispatch(userLogedin());
  } else {
    dispatch(userLoginFailure());
  }
}; // will be updated to call api to check auth and save user to local storage

export const atemptLogout = data => (dispatch) => {
  dispatch(startUserLogout());

  if (data) {
    dispatch(userLogedout());
  } else {
    dispatch(userLogoutFailure());
  }
}; // will be updated to remove user from localstorage
