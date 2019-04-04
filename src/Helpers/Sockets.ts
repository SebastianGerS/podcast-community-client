// eslint-disable-next-line import/no-unresolved
import io from 'socket.io-client';
import { Dispatch } from 'redux';
import Config from '../Config/config';
import { Notification } from '../Models/Notification';
import { addNewNotification, AddNewNotification } from '../Actions/Notifications';

export function openSocket(userId: string, dispatch: Dispatch<AddNewNotification>): any {
  const socket = io.connect(Config.API_BASE_URL);

  socket.on(`user/${userId}/notification`, (notification: Notification) => {
    dispatch(addNewNotification(notification));
  });

  return socket;
}
