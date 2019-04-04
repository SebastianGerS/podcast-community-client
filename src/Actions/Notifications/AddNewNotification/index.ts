import * as ActionTypes from './types';
import { Notification } from '../../../Models/Notification';

export interface AddNewNotification {
  type: ActionTypes.ADD_NEW_NOTIFICATION;
  notification: Notification;
}

export const addNewNotification = (notification: Notification): AddNewNotification => ({
  type: ActionTypes.ADD_NEW_NOTIFICATION,
  notification,
});
