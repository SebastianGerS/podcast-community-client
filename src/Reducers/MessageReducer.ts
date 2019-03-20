import { List } from 'immutable';
import * as ActionTypes from '../Actions/Message/types';
import { Message } from '../Models/Message';
import { MessageActions } from '../Actions/Message';

export interface MessageState {
  messages: List<Message>;
}

const DEFAULT_STATE: MessageState = {
  messages: List(),
};

export default function (state: MessageState = DEFAULT_STATE, action: MessageActions): MessageState {
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
