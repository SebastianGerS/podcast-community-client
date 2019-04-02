import React, { MouseEvent, useState, useEffect } from 'react';
import { User } from '../../Models/User';
import usePrevious from '../../Helpers/CustomHooks';
import { Event } from '../../Models/Event';

interface Props{
  targetUser: User;
  currentUser: User;
  toggleFollows: (targetUserId: string) => void;
  isLogedIn: boolean;
  isCreatingUserEvent: boolean;
  eventTargetUserId: string;
  type: string;
  socket: any;
  createdEvent: Event;
}

function FollowButton({
  targetUser, currentUser, toggleFollows, isLogedIn, isCreatingUserEvent, type, eventTargetUserId, socket, createdEvent,
}: Props): JSX.Element {
  const [hasBeenToggledOn, sethasBeenToggledOn] = useState(false);
  const currentUserId = typeof currentUser._id === 'string' ? currentUser._id : '';
  const targetUserId = typeof targetUser._id === 'string' ? targetUser._id : '';
  const currentUserFollowing = Array.isArray(currentUser.following) ? currentUser.following : [];
  const targetUserRequests = Array.isArray(targetUser.requests) ? targetUser.requests : [];

  const prevCurrentUserFollowing = usePrevious(currentUserFollowing);
  const prevIsCreatingUserEvent = usePrevious(isCreatingUserEvent);

  useEffect(() => {
    if (prevIsCreatingUserEvent && !isCreatingUserEvent && isLogedIn && targetUserId === createdEvent.target.item
      && (createdEvent.type === 'follow' || createdEvent.type === 'request')) {
      socket.emit('user/notification', targetUserId);
    }
  }, [isCreatingUserEvent]);

  const requestSent = (
    hasBeenToggledOn
    && !currentUserFollowing.includes(targetUserId)
    && !prevCurrentUserFollowing.includes(targetUserId)
  );

  const onClick = (e: MouseEvent): void => {
    e.preventDefault();

    if (isLogedIn) {
      sethasBeenToggledOn(!requestSent);
      toggleFollows(targetUserId);
    }
  };

  let icon;
  let text;
  if (isCreatingUserEvent && hasBeenToggledOn && targetUserId === eventTargetUserId) {
    icon = 'icon-spinner';
    text = '';
  } else if (currentUserFollowing.includes(targetUserId)) {
    icon = 'icon-following';
    text = 'Following';
  } else if (
    (targetUserRequests.includes(currentUserId) && !hasBeenToggledOn)
    || (createdEvent.type === 'request' && targetUserId === eventTargetUserId)) {
    icon = 'icon-requested';
    text = 'Requested';
  } else {
    icon = 'icon-follow';
    text = 'Follow';
  }

  return (
    <button
      className={`follow-is-${type} ${icon}`}
      aria-label="follow-button"
      type="button"
      onClick={onClick}
    >
      {type === 'button' ? text : null}
    </button>
  );
}

export default FollowButton;
