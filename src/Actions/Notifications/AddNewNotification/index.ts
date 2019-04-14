import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Notification } from '../../../Models/Notification';
import { GetSelfSuccess, attemptGetSelf } from '../../Auth';
import { SetMessage } from '../../Message';

export interface AddNewNotification {
  type: ActionTypes.ADD_NEW_NOTIFICATION;
  notification: Notification;
}

export const addNewNotification = (notification: Notification): AddNewNotification => ({
  type: ActionTypes.ADD_NEW_NOTIFICATION,
  notification,
});

export type AddNotificationActions = AddNewNotification | GetSelfSuccess | SetMessage;

type AddNotificationAction = (dispatch: Dispatch<AddNotificationActions>) => void;

export const addNotification = (notification: Notification): AddNotificationAction => (
  dispatch: Dispatch<AddNotificationActions>,
): void => {
  dispatch(addNewNotification(notification));
  attemptGetSelf()(dispatch);
};
