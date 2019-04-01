import React, { useEffect, UIEvent, useState } from 'react';
import List from '../Common/List';
import NotificationComponent from './Notification';
import { Notification } from '../../Models/Notification';

export interface NotificationsProps {
  notifications: Notification[];
  getNotifications: (offset: number) => void;
  nextOffset: number;
  morePages: boolean;
}

function Notifications({
  notifications, getNotifications, nextOffset, morePages,
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
      && Array.isArray(notifications) && morePages && !isFetching
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
      <List component={NotificationComponent} data={notifications} />
    </div>
  );
}

export default Notifications;
