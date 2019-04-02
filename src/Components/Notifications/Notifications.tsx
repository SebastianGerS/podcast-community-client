import React, { useEffect, UIEvent, useState } from 'react';
import List from '../Common/List';
import NotificationComponent from '../../Containers/Notifications/Notification';
import { Notification } from '../../Models/Notification';

export interface NotificationsProps {
  notifications: Notification[];
  getNotifications: (offset: number) => void;
  nextOffset: number;
  morePages: boolean;
  total: number;
}

function Notifications({
  notifications, getNotifications, nextOffset, morePages, total,
}: NotificationsProps): JSX.Element {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (notifications.length === 0) {
      getNotifications(nextOffset);
    }
  }, []);

  const onScroll = (e: UIEvent): void => {
    if (
      (e.currentTarget.scrollTop) >= (e.currentTarget.scrollHeight - e.currentTarget.scrollHeight / 2)
      && Array.isArray(notifications) && morePages && !isFetching && nextOffset < total
    ) {
      setIsFetching(true);
      getNotifications(nextOffset);
    }
  };

  useEffect(() => {
    setIsFetching(false);
  }, [notifications]);

  return (
    <div className="notifications" onScroll={onScroll}>
      { notifications.length > 0
        ? <List component={NotificationComponent} data={notifications} />
        : <p>You have no notifications</p>
      }
    </div>
  );
}

export default Notifications;
