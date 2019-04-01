import * as ActionTypes from '../Actions/Notifications/types';
import { Notification } from '../Models/Notification';
import { GetNotificationsAction } from '../Actions/Notifications';

export interface NotificationState {
  notifications: Notification[];
  isFetchingNotifications: boolean;
  nextOffset: number;
  morePages: boolean;
}

const DEFAULT_STATE: NotificationState = {
  notifications: [],
  isFetchingNotifications: false,
  nextOffset: 0,
  morePages: false,
};

export default function (state: NotificationState = DEFAULT_STATE, action: GetNotificationsAction): NotificationState {
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATIONS_START:
      return {
        ...state,
        isFetchingNotifications: true,
      };
    case ActionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetchingNotifications: false,
        notifications: state.nextOffset === 0
          ? action.data.results.map(notification => new Notification(notification))
          : [...state.notifications, ...action.data.results.map(notification => new Notification(notification))],
        nextOffset: action.data.next_offset,
        morePages: action.data.morePages,
      };
    case ActionTypes.GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isFetchingNotifications: false,
      };
    default:
      return {
        ...state,
      };
  }
}
