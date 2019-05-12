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
  closeNotificationsModal: () => void;
}

function Notifications({
  notifications, getNotifications, nextOffset, morePages, total, closeNotificationsModal,
}: NotificationsProps): JSX.Element {
  const [isFetching, setIsFetching] = useState(false);

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
      <button
        title="close"
        className="close-notifications-modal-button"
        type="button"
        aria-label="close-notifications-modal-button"
        onClick={closeNotificationsModal}
      />
      { notifications.length > 0
        ? <div><List component={NotificationComponent} data={notifications} /></div>
        : <div className="no-notifications"><p>You have no notifications</p></div>
      }
    </div>
  );
}

export default Notifications;
