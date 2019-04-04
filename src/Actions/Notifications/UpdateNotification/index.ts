
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Notification } from '../../../Models/Notification';


interface UpdateNotificationStart {
  type: ActionTypes.UPDATE_NOTIFICATION_START;
}

const updateNotificationtart = (): UpdateNotificationStart => ({
  type: ActionTypes.UPDATE_NOTIFICATION_START,
});

interface UpdateNotificationSuccess {
  type: ActionTypes.UPDATE_NOTIFICATION_SUCCESS;
  notification: Notification;
}

const updateNotificationSuccess = (notification: Notification): UpdateNotificationSuccess => ({
  type: ActionTypes.UPDATE_NOTIFICATION_SUCCESS,
  notification,
});

interface UpdateNotificationFailure {
  type: ActionTypes.UPDATE_NOTIFICATION_FAILURE;
}

const updateNotificationFailure = (): UpdateNotificationFailure => ({
  type: ActionTypes.UPDATE_NOTIFICATION_FAILURE,
});

const UpdateNotification = (notificationId: string): Promise<Response> => Fetch(
  `/notifications/${notificationId}`, 'PUT', {},
);

export type UpdateNotificationAction = UpdateNotificationStart | UpdateNotificationSuccess | UpdateNotificationFailure;

type AttemptUpdateNotification = (dispatch: Dispatch<UpdateNotificationAction | SetMessage>) => Promise<void>;

export const attemptUpdateNotification = (notificationId: string): AttemptUpdateNotification => async (
  dispatch: Dispatch<UpdateNotificationAction | SetMessage>,
): Promise<void> => {
  dispatch(updateNotificationtart());

  const response = await UpdateNotification(notificationId).catch(error => error);

  if (response.error) {
    dispatch(updateNotificationFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.notification) dispatch(updateNotificationSuccess(response.notification));
};
