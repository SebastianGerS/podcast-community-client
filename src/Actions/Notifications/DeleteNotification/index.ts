
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { Notification } from '../../../Models/Notification';
import { attemptSetMessage, SetMessage } from '../../Message';


interface DeleteNotificationStart {
  type: ActionTypes.DELETE_NOTIFICATION_START;
}

const DeleteNotificationtart = (): DeleteNotificationStart => ({
  type: ActionTypes.DELETE_NOTIFICATION_START,
});

interface DeleteNotificationSuccess {
  type: ActionTypes.DELETE_NOTIFICATION_SUCCESS;
  notification: Notification;
}

const DeleteNotificationSuccess = (notification: Notification): DeleteNotificationSuccess => ({
  type: ActionTypes.DELETE_NOTIFICATION_SUCCESS,
  notification,
});

interface DeleteNotificationFailure {
  type: ActionTypes.DELETE_NOTIFICATION_FAILURE;
}

const DeleteNotificationFailure = (): DeleteNotificationFailure => ({
  type: ActionTypes.DELETE_NOTIFICATION_FAILURE,
});

const DeleteNotification = (notificationId: string): Promise<Response> => Fetch(
  `/notifications/${notificationId}`, 'DELETE', {},
);

export type DeleteNotificationAction = DeleteNotificationStart | DeleteNotificationSuccess | DeleteNotificationFailure;

type AttemptDeleteNotification = (dispatch: Dispatch<DeleteNotificationAction | SetMessage>) => Promise<void>;

export const attemptDeleteNotification = (notification: Notification): AttemptDeleteNotification => async (
  dispatch: Dispatch<DeleteNotificationAction | SetMessage>,
): Promise<void> => {
  dispatch(DeleteNotificationtart());

  const notificationId = typeof notification._id === 'string' ? notification._id : '';

  const response = await DeleteNotification(notificationId).catch(error => error);

  if (response.error) {
    dispatch(DeleteNotificationFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (!response.error) dispatch(DeleteNotificationSuccess(notification));
};
