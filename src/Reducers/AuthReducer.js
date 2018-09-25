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
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state, isLogedIn: true, isLoginIn: false, user: new User(action.user),
      };
    case ActionTypes.USER_LOGIN_FAILUR:
      return { ...state, isLoginIn: false };
    case ActionTypes.IS_LOGED_IN:
      return { ...state, isLogedIn: true, user: typeof state.user.id !== 'string' ? new User(action.user) : state.user };
    case ActionTypes.USER_LOGOUT_START:
      return { ...state, isLogingOut: true };
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state, isLogedIn: false, isLogingOut: false, user: new User(),
      };
    case ActionTypes.USER_LOGOUT_FAILUR:
      return { ...state, isLogingOut: false };
    case ActionTypes.USER_REGISTRATION_START:
      return { ...state, isRegistering: true };
    case ActionTypes.USER_REGISTRATION_SUCCESS:
      return { ...state, isRegistering: false, redirect: new Redirect({ to: '/' }) };
    case ActionTypes.USER_REGISTRATION_FAILUR:
      return { ...state, isRegistering: false };
    case ActionTypes.GET_SELF_SUCCESS:
      return {
        ...state, user: new User(action.user),
      };
    default:
      return { ...state };
  }
}
