import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../../Models/Notification';

interface Props {
  data: Notification;
  deleteNotification: (notification: Notification) => void;
  updateNotification: (notificationId: string) => void;
  toggleNotificationsModal: () => void;
}

function NotificationComponent({
  data, deleteNotification, updateNotification, toggleNotificationsModal,
}: Props): JSX.Element {
  const username = data.event.agent.item.username ? data.event.agent.item.username : '';
  const thumbnail = data.event.agent.item.profile_img ? data.event.agent.item.profile_img.thumb : '';

  let message;
  let linkTo;

  switch (data.event.type) {
    case 'request':
      message = `${username} wants to follow you`;
      linkTo = '/follows/1';
      break;
    case 'confirm':
      message = `you are now following ${username}`;
      linkTo = `/profile/${data.event.agent.item._id}`;
      break;
    case 'follow':
      message = `${username} is now following you`;
      linkTo = `/profile/${data.event.agent.item._id}`;
      break;
    default:
      message = '';
      linkTo = '';
      break;
  }

  const update = (): void => {
    if (!data.observed && typeof data._id === 'string') {
      updateNotification(data._id);
    }
    toggleNotificationsModal();
  };

  return (
    <div className={`notification ${data.observed ? 'observed' : 'unobserved'}`}>
      <button
        className="remove-button"
        aria-label="remove-button"
        type="button"
        onClick={() => deleteNotification(data)}
      />
      <Link to={linkTo} onClick={update}>
        <div>
          <figure>
            <img src={typeof thumbnail === 'string' ? thumbnail : ''} alt="profile_img" />
          </figure>
          <p>
            {message}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default NotificationComponent;
