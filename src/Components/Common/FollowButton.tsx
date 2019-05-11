import React, { MouseEvent } from 'react';
import { User } from '../../Models/User';

interface Props{
  targetUser: User;
  currentUser: User;
  toggleFollows: (targetUserId: string) => void;
  toggleLoginModal: () => void;
  isLogedIn: boolean;
  isCreatingUserEvent: boolean;
  eventTargetUserId: string;
  type: string;
}

function FollowButton({
  targetUser, currentUser, toggleFollows, isLogedIn, isCreatingUserEvent, type, eventTargetUserId, toggleLoginModal,
}: Props): JSX.Element {
  const currentUserId = typeof currentUser._id === 'string' ? currentUser._id : '';
  const targetUserId = typeof targetUser._id === 'string' ? targetUser._id : '';
  const targetUserFollowers = Array.isArray(targetUser.followers) ? targetUser.followers : [];
  const targetUserRequests = Array.isArray(targetUser.requests) ? targetUser.requests : [];

  const onClick = (e: MouseEvent): void => {
    e.preventDefault();

    if (isLogedIn) {
      toggleFollows(targetUserId);
    } else {
      toggleLoginModal();
    }
  };

  let icon;
  let text;
  let title;
  if (isCreatingUserEvent && targetUserId === eventTargetUserId) {
    icon = 'icon-spinner';
    text = '';
    title = 'loading';
  } else if (targetUserFollowers.includes(currentUserId)) {
    icon = 'icon-following';
    text = 'Following';
    title = 'unfollow';
  } else if (targetUserRequests.includes(currentUserId)) {
    icon = 'icon-requested';
    text = 'Requested';
    title = 'cancel request';
  } else {
    icon = 'icon-follow';
    text = 'Follow';
    title = 'follow';
  }

  return (
    <button
      title={title}
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
