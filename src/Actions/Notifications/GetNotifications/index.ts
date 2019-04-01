
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { Notification } from '../../../Models/Notification';


interface GetNotificationsStart {
  type: ActionTypes.GET_NOTIFICATIONS_START;
}

const getNotificationStart = (): GetNotificationsStart => ({
  type: ActionTypes.GET_NOTIFICATIONS_START,
});

interface NotificationResult {
  morePages: boolean;
  next_offset: number;
  count: number;
  results: Notification[];
  total: number;
}

interface GetNotificationsSuccess {
  type: ActionTypes.GET_NOTIFICATIONS_SUCCESS;
  data: NotificationResult;
}

const getNotificationsSuccess = (data: NotificationResult): GetNotificationsSuccess => ({
  type: ActionTypes.GET_NOTIFICATIONS_SUCCESS,
  data,
});

interface GetNotificationsFailure {
  type: ActionTypes.GET_NOTIFICATIONS_FAILURE;
}

const getNotificationsFailure = (): GetNotificationsFailure => ({
  type: ActionTypes.GET_NOTIFICATIONS_FAILURE,
});

const getNotifications = (offset: number): Promise<Response> => Fetch(`/notifications?offset=${offset}`, 'GET', {});

export type GetNotificationsAction = GetNotificationsStart | GetNotificationsSuccess | GetNotificationsFailure;

type AttemptGetNotifications = (dispatch: Dispatch<GetNotificationsAction>) => Promise<void>;

export const attemptGetNotifications = (offset: number): AttemptGetNotifications => async (
  dispatch: Dispatch<GetNotificationsAction>,
): Promise<void> => {
  dispatch(getNotificationStart());

  const response = await getNotifications(offset).catch(error => error);

  if (response.error) dispatch(getNotificationsFailure());

  if (response.results) dispatch(getNotificationsSuccess(response));
};
