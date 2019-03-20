import React, { useState } from 'react';
import { User } from '../../Models/User';

interface Props {
  podcastId: string;
  user: User;
  attemptToggleSubsription: (userId: string, podcastId: string) => void;
  isLogedIn: boolean;
  isToggelingSubscription: boolean;
}

function SubscribeButton({
  podcastId, user, attemptToggleSubsription, isLogedIn, isToggelingSubscription,
}: Props): JSX.Element {
  const [subscribing, setSubscribing] = useState(false);
  const userId = typeof user._id === 'string' ? user._id : '';

  const toggleSubscription = (): void => {
    if (isLogedIn) {
      setSubscribing(true);
      attemptToggleSubsription(userId, podcastId);
    }
  };

  const subscriptions = Array.isArray(user.subscriptions) ? user.subscriptions : [];

  let subscribeText = 'Subscribe';

  if (isLogedIn) {
    if (isToggelingSubscription && subscribing) {
      subscribeText = '';
    } else {
      subscribeText = subscriptions.includes(podcastId) ? 'Unsubscribe' : 'Subscribe';
    }
  }

  return (
    <button
      type="button"
      className={
        `subscribe-button
          ${isToggelingSubscription && subscribing ? 'loading' : ''}
          ${subscribeText === 'Unsubscribe' ? 'unsubscribe' : ''}`
      }
      onClick={toggleSubscription}
    >
      {subscribeText}
    </button>
  );
}

export default SubscribeButton;
