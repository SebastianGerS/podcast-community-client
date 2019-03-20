import * as ActionTypes from '../Actions/Admin/types';
import { AdminActions } from '../Actions/Admin';
import { User } from '../Models/User';

export interface AdminState {
  isFetching: boolean;
  users: User[];
  user: User;
  morePages: boolean;
  offset: number;
}

export const DEFAULT_STATE: AdminState = {
  isFetching: false,
  users: [new User()],
  user: new User(),
  morePages: false,
  offset: 0,
};
type DEFAULT_STATE = AdminState;

export default function (state: AdminState = DEFAULT_STATE, action: AdminActions): AdminState {
  switch (action.type) {
    case ActionTypes.GET_USERS_START:
      return {
        ...state, isFetching: true,
      };
    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.data.results.map((user: User) => new User(user)),
        morePages: action.data.morePages,
        offset: action.data.next_offset,
      };
    case ActionTypes.GET_USERS_FAILUR:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.CREATE_USER_START:
      return {
        ...state, isFetching: true,
      };
    case ActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.CREATE_USER_FAILUR:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.ADMIN_UPDATE_USER_START:
      return {
        ...state, isFetching: true,
      };
    case ActionTypes.ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state, isFetching: false, user: new User(),
      };
    case ActionTypes.ADMIN_UPDATE_USER_FAILUR:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.DELETE_USER_START:
      return {
        ...state, isFetching: true,
      };
    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state, isFetching: false, user: new User(),
      };
    case ActionTypes.DELETE_USER_FAILUR:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.SET_USER:
      return {
        ...state, user: new User(action.user),
      };
    case ActionTypes.UNSET_USER:
      return {
        ...state, user: new User(),
      };
    default:
      return { ...state };
  }
}
