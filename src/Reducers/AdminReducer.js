import ActionTypes from '../Actions/Admin/types';
import User from '../Models/User';

const DEFAULT_STATE = {
  isFetching: false,
  users: [new User()],
  user: new User(),
  morePages: false,
  offset: 0,

};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS_START:
      return {
        ...state, isFetching: true,
      };
    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.data.results.map(user => new User(user)),
        morePages: action.data.morePages,
        offset: action.data.next_offset,
      };
    case ActionTypes.GET_USERS_FAILUR:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.CREATE_USERS_START:
      return {
        ...state, isFetching: true,
      };
    case ActionTypes.CREATE_USERS_SUCCESS:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.CREATE_USERS_FAILUR:
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
    case ActionTypes.DELETE_USERS_START:
      return {
        ...state, isFetching: true,
      };
    case ActionTypes.DELETE_USERS_SUCCESS:
      return {
        ...state, isFetching: false, user: new User(),
      };
    case ActionTypes.DELETE_USERS_FAILUR:
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
