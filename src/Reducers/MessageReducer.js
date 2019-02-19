import Immutable from 'immutable';
import ActionTypes from '../Actions/Message/types';
import Message from '../Models/Message';

const DEFAULT_STATE = {
  messages: Immutable.List(),
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_MESSAGE:
      return {
        ...state,
        messages: state.messages.contains(new Message(action.data))
          ? state.messages
          : state.messages.push(new Message(action.data)),
      };
    case ActionTypes.REMOVE_MESSAGE:
      return {
        ...state, messages: state.messages.shift(),
      };
    default:
      return { ...state };
  }
}
