import ActionTypes from '../Actions/Message/types';

const DEFAULT_STATE = {
  showMessage: false,
  message: '',
  type: '',
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_MESSAGE:
      return {
        ...state, showMessage: true, message: action.data.message, type: action.data.type,
      };
    case ActionTypes.REMOVE_MESSAGE:
      return {
        ...state, showMessage: false, message: '', type: '',
      };
    default:
      return { ...state };
  }
}
