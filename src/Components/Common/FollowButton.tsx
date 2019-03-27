import React, { MouseEvent, useState } from 'react';
import { User } from '../../Models/User';
import usePrevious from '../../Helpers/CustomHooks';

interface Props{
  targetUser: User;
  currentUser: User;
  toggleFollows: (userId: string, targetUserId: string) => void;
  isLogedIn: boolean;
  isToggelingFollows: boolean;
  type: string;
}

function FollowButton({
  targetUser, currentUser, toggleFollows, isLogedIn, isToggelingFollows, type,
}: Props): JSX.Element {
  const [hasBeenToggledOn, sethasBeenToggledOn] = useState(false);
  const currentUserId = typeof currentUser._id === 'string' ? currentUser._id : '';
  const targetUserId = typeof targetUser._id === 'string' ? targetUser._id : '';
  const currentUserFollowing = Array.isArray(currentUser.following) ? currentUser.following : [];
  const targetUserRequests = Array.isArray(targetUser.requests) ? targetUser.requests : [];

  const prevCurrentUserFollowing = usePrevious(currentUserFollowing);

  const requestSent = (
    hasBeenToggledOn
    && !currentUserFollowing.includes(targetUserId)
    && !prevCurrentUserFollowing.includes(targetUserId)
  );

  const onClick = (e: MouseEvent): void => {
    e.preventDefault();

    if (isLogedIn) {
      sethasBeenToggledOn(!requestSent);
      toggleFollows(currentUserId, targetUserId);
    }
  };

  let icon;
  let text;
  if (isToggelingFollows && hasBeenToggledOn) {
    icon = 'button-spinner';
    text = '';
  } else if (currentUserFollowing.includes(targetUserId)) {
    icon = 'following';
    text = 'Following';
  } else if (
    (targetUserRequests.includes(currentUserId) && !hasBeenToggledOn)
    || (requestSent && !targetUserRequests.includes(currentUserId))) {
    icon = 'requested';
    text = 'Requested';
  } else {
    icon = 'follow';
    text = 'Follow';
  }

  return (
    <button
      className={`follow-${type} ${icon}`}
      aria-label="follow-button"
      type="button"
      onClick={onClick}
    >
      {type === 'button' ? text : null}
    </button>
  );
}

export default FollowButton;
