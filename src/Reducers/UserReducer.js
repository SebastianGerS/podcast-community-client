import ActionTypes from '../Actions/User/types';
import User from '../Models/User';

const DEFAULT_STATE = {
  isUpdating: false,
  user: new User(),
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_START:
      return { ...state, isUpdating: true };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state, isUpdating: false, user: new User(action.user),
      };
    case ActionTypes.GET_USER_FAILUR:
      return { ...state, isUpdating: false };
    case ActionTypes.UPDATE_USER_START:
      return { ...state, isUpdating: true };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state, isUpdating: false,
      };
    case ActionTypes.UPDATE_USER_FAILUR:
      return { ...state, isUpdating: false };
    default:
      return { ...state };
  }
}
