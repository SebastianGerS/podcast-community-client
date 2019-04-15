import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../../Models/Notification';
import { setMaxLength } from '../../Helpers/Utils';

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
  const agentName = setMaxLength(typeof agent.name === 'string' ? agent.name : '', 50);
  const objectName = setMaxLength(typeof object.name === 'string' ? object.name : '', 100);
  let thumbnail = agent.image ? agent.image : '';

  let message;
  let linkTo;

  switch (type) {
    case 'request':
      message = `${agentName} wants to follow you`;
      linkTo = '/follows/1';
      break;
    case 'confirm':
      message = `you are now following ${agentName}`;
      linkTo = `/profile/${agent._id}`;
      break;
    case 'follow':
      message = `${agentName} is now following you`;
      linkTo = `/profile/${agent._id}`;
      break;
    case 'recommend':
      const {
        kind, _id, image,
      } = object;

      const parentName = setMaxLength(typeof object.parent_name === 'string' ? object.parent_name : '', 50);

      message = kind === 'Episode'
        ? `${agentName} recomended: ${objectName} from ${parentName}`
        : `${agentName} recomended: ${objectName}`;

      linkTo = `/${kind === 'Episode' ? 'episodes' : 'podcasts'}/${_id}`;
      thumbnail = image || '';
      break;
    case 'newEpisode': {
      message = `${agentName} has a new episode — ${objectName}`;
      linkTo = `/episodes/${object._id}`;
      break;
    }
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
            <img
              src={typeof thumbnail === 'string' ? thumbnail : ''}
              alt={objectName.length > 0 ? objectName : agentName}
            />
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
