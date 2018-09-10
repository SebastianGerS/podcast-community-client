import ActionTypes from '../Actions/Auth/types';
import User from '../Models/User';
import Redirect from '../Models/Redirect';

const DEFAULT_STATE = {
  isLogedIn: false,
  isLogingIn: false,
  isLogingOut: false,
  isRegistering: false,
  user: new User(),
  redirect: new Redirect(),
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_START:
      return { ...state, isLogingIn: true };
    case ActionTypes.USER_LOGIN_SUCESS:
      return {
        ...state, isLogedIn: true, isLoginIn: false, user: new User(action.user),
      };
    case ActionTypes.USER_LOGIN_FAILUR:
      return { ...state, isLoginIn: false };
    case ActionTypes.USER_LOGOUT_START:
      return { ...state, isLogingOut: true };
    case ActionTypes.USER_LOGOUT_SUCESS:
      return {
        ...state, isLogedIn: false, isLogingOut: false,
      };
    case ActionTypes.USER_LOGOUT_FAILUR:
      return { ...state, isLogingOut: false };
    case ActionTypes.USER_REGISTRATION_START:
      return { ...state, isRegistering: true };
    case ActionTypes.USER_REGISTRATION_SUCESS:
      return { ...state, isRegistering: false, redirect: new Redirect({ to: '/' }) };
    case ActionTypes.USER_REGISTRATION_FAILUR:
      return { ...state, isRegistering: false };
    default:
      return { ...state };
  }
}
