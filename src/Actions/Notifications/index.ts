import { GetNotificationsAction } from './GetNotifications';
import { DeleteNotificationAction } from './DeleteNotification';
import { AddNotificationActions } from './AddNewNotification';
import { UpdateNotificationAction } from './UpdateNotification';

export type NotificationActions = (
  GetNotificationsAction | DeleteNotificationAction | AddNotificationActions | UpdateNotificationAction
);

export * from './GetNotifications';
export * from './DeleteNotification';
export * from './AddNewNotification';
export * from './UpdateNotification';
