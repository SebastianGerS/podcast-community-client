import { GetNotificationsAction } from './GetNotifications';
import { DeleteNotificationAction } from './DeleteNotification';

export type NotificationActions = GetNotificationsAction | DeleteNotificationAction;

export * from './GetNotifications';
export * from './DeleteNotification';
