import * as ActionTypes from '../Actions/Auth/types';
import { User } from '../Models/User';
import { AuthActions } from '../Actions/Auth';

export interface AuthState {
  isLogedIn: boolean;
  isLogingIn: boolean;
  isLogingOut: boolean;
  isRegistering: boolean;
  user: User;
  isAdmin: boolean;
}

const DEFAULT_STATE: AuthState = {
  isLogedIn: false,
  isLogingIn: false,
  isLogingOut: false,
  isRegistering: false,
  user: new User(),
  isAdmin: false,
};

export default function (state: AuthState = DEFAULT_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_START:
      return { ...state, isLogingIn: true };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogedIn: true,
        isLogingIn: false,
        user: new User(action.user),
        isAdmin: action.user.type === 'admin',
      };
    case ActionTypes.USER_LOGIN_FAILURE:
      return { ...state, isLogingIn: false };
    case ActionTypes.IS_LOGED_IN:
      return {
        ...state,
        isLogedIn: true,
        user: typeof state.user._id !== 'string' ? new User(action.user) : state.user,
        isAdmin: typeof state.user._id !== 'string' ? action.user.type === 'admin' : state.user.type === 'admin',
      };
    case ActionTypes.USER_LOGOUT_START:
      return { ...state, isLogingOut: true };
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state, isLogedIn: false, isLogingOut: false, user: new User(), isAdmin: false,
      };
    case ActionTypes.USER_LOGOUT_FAILURE:
      return { ...state, isLogingOut: false };
    case ActionTypes.USER_REGISTRATION_START:
      return { ...state, isRegistering: true };
    case ActionTypes.USER_REGISTRATION_SUCCESS:
      return { ...state, isRegistering: false };
    case ActionTypes.USER_REGISTRATION_FAILURE:
      return { ...state, isRegistering: false };
    case ActionTypes.GET_SELF_SUCCESS:
      return {
        ...state, user: new User(action.user),
      };
    default:
      return { ...state };
  }
}
