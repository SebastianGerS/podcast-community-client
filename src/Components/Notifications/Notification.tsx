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
  const { agent, object, type } = data.event;
  const username = agent.item.username ? agent.item.username : '';
  let thumbnail = agent.item.profile_img ? agent.item.profile_img.thumb : '';

  let message;
  let linkTo;

  switch (type) {
    case 'request':
      message = `${username} wants to follow you`;
      linkTo = '/follows/1';
      break;
    case 'confirm':
      message = `you are now following ${username}`;
      linkTo = `/profile/${agent.item._id}`;
      break;
    case 'follow':
      message = `${username} is now following you`;
      linkTo = `/profile/${agent.item._id}`;
      break;
    case 'recommend':
      const {
        title, kind, item, image,
      } = object;

      message = kind === 'Episode'
        ? `${username} recomended: ${title} from the podcast – ${object.podcast_title}`
        : `${username} recomended: ${title}`;

      linkTo = `/${kind === 'Episode' ? 'episodes' : 'podcasts'}/${item}`;
      thumbnail = image || '';
      break;
    default:
      message = '';
      linkTo = '';
      thumbnail = '';
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
