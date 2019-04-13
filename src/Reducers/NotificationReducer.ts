import * as ActionTypes from '../Actions/Notifications/types';
import { Notification } from '../Models/Notification';
import { NotificationActions } from '../Actions/Notifications';

export interface NotificationState {
  notifications: Notification[];
  isFetchingNotifications: boolean;
  isDeletingNotification: boolean;
  isUpdatingNotification: boolean;
  nextOffset: number;
  morePages: boolean;
  total: number;
  numberOfUnobserved: number;
}

const DEFAULT_STATE: NotificationState = {
  notifications: [],
  isFetchingNotifications: false,
  isDeletingNotification: false,
  isUpdatingNotification: false,
  nextOffset: 0,
  morePages: false,
  total: 0,
  numberOfUnobserved: 0,
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
        numberOfUnobserved: action.data.numberOfUnobserved,
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
        numberOfUnobserved: action.notification.observed === true
          ? state.numberOfUnobserved
          : state.numberOfUnobserved - 1,
      };
    case ActionTypes.DELETE_NOTIFICATION_FAILURE:
      return {
        ...state,
        isDeletingNotification: false,
      };
    case ActionTypes.UPDATE_NOTIFICATION_START:
      return {
        ...state,
        isUpdatingNotification: true,
      };
    case ActionTypes.UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isUpdatingNotification: false,
        notifications: [...state.notifications.map((notification) => {
          const notificationCopy = JSON.parse(JSON.stringify(notification));
          if (action.notificationId === notification._id) {
            notificationCopy.observed = true;
          }
          return new Notification(notificationCopy);
        })],
        numberOfUnobserved: state.numberOfUnobserved - 1,
      };
    case ActionTypes.UPDATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        isUpdatingNotification: false,
      };
    case ActionTypes.ADD_NEW_NOTIFICATION:
      return {
        ...state,
        notifications: [new Notification(action.notification), ...state.notifications],
        numberOfUnobserved: state.numberOfUnobserved + 1,
        nextOffset: state.nextOffset + 1,
        total: state.total + 1,
      };
    default:
      return {
        ...state,
      };
  }
}
