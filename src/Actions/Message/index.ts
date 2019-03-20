import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Message } from '../../Models/Message';

export interface SetMessage {
  type: ActionTypes.SET_MESSAGE;
  data: Message;
}

export const setMessage = (data: Message): SetMessage => (
  {
    type: ActionTypes.SET_MESSAGE,
    data,
  }
);

export interface RemoveMessage {
  type: ActionTypes.REMOVE_MESSAGE;
}

export const removeMessage = (): RemoveMessage => (
  {
    type: ActionTypes.REMOVE_MESSAGE,
  }
);

type AttemptSetMessageAction = (dispatch: Dispatch<SetMessage>) => void;

export const attemptSetMessage = (data: Message): AttemptSetMessageAction => (dispatch: Dispatch<SetMessage>): void => {
  dispatch(setMessage(data));
};

type AttemptRemoveMessageAction = (dispatch: Dispatch<RemoveMessage>) => void;

export const attemptRemoveMessage = (): AttemptRemoveMessageAction => (dispatch: Dispatch<RemoveMessage>): void => {
  dispatch(removeMessage());
};

export type MessageActions = SetMessage | RemoveMessage;
