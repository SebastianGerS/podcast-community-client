import React, { useState } from 'react';
import { User } from '../../Models/User';
import { Podcast } from '../../Models/Podcast';

interface Props {
  podcast: Podcast;
  user: User;
  attemptToggleSubsription: (userId: string, target: object) => void;
  isLogedIn: boolean;
  isToggelingSubscription: boolean;
}

function SubscribeButton({
  podcast, user, attemptToggleSubsription, isLogedIn, isToggelingSubscription,
}: Props): JSX.Element {
  const [subscribing, setSubscribing] = useState(false);
  const userId = typeof user._id === 'string' ? user._id : '';
  const podcastId = typeof podcast.id === 'string' ? podcast.id : '';

  const toggleSubscription = (): void => {
    if (isLogedIn) {
      const target = {
        _id: podcastId,
        kind: 'Podcast',
        name: typeof podcast.title === 'string' ? podcast.title : podcast.title_original,
        image: podcast.image,
      };

      setSubscribing(true);
      attemptToggleSubsription(userId, target);
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
