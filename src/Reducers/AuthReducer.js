import ActionTypes from '../Actions/Auth/types';

const DEFAULT_STATE = {
  isLogedIn: false,
  isLogingIn: false,
  isLogingOut: false,
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_START:
      return { ...state, isLogingIn: true };
    case ActionTypes.USER_LOGIN_SUCESS:
      return { ...state, isLogedIn: true, isLoginIn: false };
    case ActionTypes.USER_LOGIN_FAILUR:
      return { ...state, isLoginIn: false };
    case ActionTypes.USER_LOGOUT_START:
      return { ...state, isLogingOut: true };
    case ActionTypes.USER_LOGOUT_SUCESS:
      return { ...state, isLogedIn: false, isLoginOut: false };
    case ActionTypes.USER_LOGOUT_FAILUR:
      return { ...state, isLogingOut: false };
    default:
      return { ...state };
  }
}
