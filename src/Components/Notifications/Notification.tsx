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
  const username = agent.name ? agent.name : '';
  let thumbnail = agent.image ? agent.image : '';

  let message;
  let linkTo;

  switch (type) {
    case 'request':
      message = `${username} wants to follow you`;
      linkTo = '/follows/1';
      break;
    case 'confirm':
      message = `you are now following ${username}`;
      linkTo = `/profile/${agent._id}`;
      break;
    case 'follow':
      message = `${username} is now following you`;
      linkTo = `/profile/${agent._id}`;
      break;
    case 'recommend':
      const {
        name, kind, _id, image,
      } = object;

      message = kind === 'Episode'
        ? `${username} recomended: ${name} from the podcast – ${object.parent_name}`
        : `${username} recomended: ${name}`;

      linkTo = `/${kind === 'Episode' ? 'episodes' : 'podcasts'}/${_id}`;
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
