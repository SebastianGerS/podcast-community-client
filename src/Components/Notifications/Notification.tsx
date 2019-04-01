import React from 'react';
import { Notification } from '../../Models/Notification';

interface Props {
  data: Notification;
}

function NotificationComponent({ data }: Props): JSX.Element {
  const username = data.event.agent.item.username ? data.event.agent.item.username : '';
  const thumbnail = data.event.agent.item.profile_img ? data.event.agent.item.profile_img.thumb : '';
  let message;

  switch (data.event.type) {
    case 'request':
      message = `${username} wants to follow you`;
      break;
    case 'confirm':
      message = `you are now following ${username}`;
      break;
    case 'follow':
      message = `${username} is now following you`;
      break;
    default:
      message = '';
      break;
  }


  return (
    <div className={`notification ${data.observed ? 'observed' : 'unobserved'}`}>
      <button className="remove-button" aria-label="remove-button" type="button" />
      <div>
        <figure>
          <img src={typeof thumbnail === 'string' ? thumbnail : ''} alt="profile_img" />
        </figure>
        <p>
          {message}
        </p>
      </div>
    </div>
  );
}

export default NotificationComponent;
