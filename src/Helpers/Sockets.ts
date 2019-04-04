// eslint-disable-next-line import/no-unresolved
import io from 'socket.io-client';
import { Dispatch } from 'redux';
import Config from '../Config/config';
import { Notification } from '../Models/Notification';
import { addNotification, AddNotificationActions } from '../Actions/Notifications';

export function openSocket(userId: string, dispatch: Dispatch<AddNotificationActions>): any {
  const socket = io.connect(Config.API_BASE_URL);

  socket.on(`user/${userId}/notification`, (notification: Notification) => {
    addNotification(notification)(dispatch);
  });

  return socket;
}
