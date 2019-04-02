import * as ActionTypes from '../Actions/Notifications/types';
import { Notification } from '../Models/Notification';
import { NotificationActions } from '../Actions/Notifications';

export interface NotificationState {
  notifications: Notification[];
  isFetchingNotifications: boolean;
  isDeletingNotification: boolean;
  nextOffset: number;
  morePages: boolean;
  total: number;
}

const DEFAULT_STATE: NotificationState = {
  notifications: [],
  isFetchingNotifications: false,
  isDeletingNotification: false,
  nextOffset: 0,
  morePages: false,
  total: 0,
};

export default function (state: NotificationState = DEFAULT_STATE, action: NotificationActions): NotificationState {
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
        total: action.data.total,
      };
    case ActionTypes.GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isFetchingNotifications: false,
      };
    case ActionTypes.DELETE_NOTIFICATION_START:
      return {
        ...state,
        isDeletingNotification: true,
      };
    case ActionTypes.DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isDeletingNotification: false,
        notifications: state.notifications.filter(notification => notification !== action.notification),
        total: state.total - 1,
        nextOffset: state.nextOffset - 1,
      };
    case ActionTypes.DELETE_NOTIFICATION_FAILURE:
      return {
        ...state,
        isDeletingNotification: false,
      };
    default:
      return {
        ...state,
      };
  }
}
