import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { openSocket } from '../../../Helpers/Sockets';
import { AddNotificationActions } from '../../Notifications';

export interface SetSocket {
  type: ActionTypes.SET_SOCKET;
  socket: any;
}

const setSocket = (socket: any): SetSocket => ({
  type: ActionTypes.SET_SOCKET,
  socket,
});

type CreateSocketAction = (dispatch: Dispatch<SetSocket | AddNotificationActions>) => void;

export const createSocket = (): CreateSocketAction => (
  dispatch: Dispatch<SetSocket | AddNotificationActions>,
): void => {
  const socket = openSocket();

  dispatch(setSocket(socket));
};
