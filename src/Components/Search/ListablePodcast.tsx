import React, { useState } from 'react';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';
import { User } from '../../Models/User';
import { Podcast } from '../../Models/Podcast';

interface Props {
  atemptToggleSubsription: (UserId: string | StringConstructor, podcastId: string | StringConstructor) => void;
  data: Podcast;
  isToggelingSubscription: boolean;
  user: User;
  isLogedIn: boolean;
}
function ListablePodcast({
  atemptToggleSubsription, data, isToggelingSubscription, user, isLogedIn,
}: Props): JSX.Element {
  const [subscribing, setSubscribing] = useState(false);

  const toggleSubscription = (): void => {
    if (isLogedIn) {
      setSubscribing(true);
      atemptToggleSubsription(user._id, data.id);
    }
  };

  const title = (
    typeof data.title === 'string'
      ? data.title
      : typeof data.title_original === 'string'
        ? data.title_original
        : ''
  );

  const publisher = (
    typeof data.publisher === 'string'
      ? data.publisher
      : typeof data.publisher_original === 'string'
        ? data.publisher_original
        : ''
  );

  const description = (
    typeof data.description === 'string'
      ? data.description
      : typeof data.description_original === 'string'
        ? data.description_original
        : ''
  );

  const subscriptions = Array.isArray(user.subscriptions) ? user.subscriptions : [];
  const podcastId = typeof data.id === 'string' ? data.id : '';
  let subscribeText = 'Subscribe';

  if (isLogedIn) {
    if (isToggelingSubscription && subscribing) {
      subscribeText = '';
    } else {
      subscribeText = subscriptions.includes(podcastId) ? 'Unsubscribe' : 'Subscribe';
    }
  }

  return (
    <div className="listable-podcast-searchresult">
      <h3>{title.length > 35 ? `${title.substring(0, 31)}...` : title}</h3>
      <div>
        <figure>
          <img src={typeof data.thumbnail === 'string' ? data.thumbnail : ''} alt="podcastlogo" />
        </figure>
        <p>
          <span>{`By ${publisher.length > 27 ? `${publisher.substring(0, 23)}...` : publisher}`}</span>
          <span>
            {`Last updated ${
              getDatefromMilisecond(
                typeof data.lastest_pub_date_ms === 'number' ? data.lastest_pub_date_ms : 0,
              )}
            `}
          </span>
        </p>
      </div>
      <div>
        <p>
          {description.length > 150 ? `${description.substring(0, 147)}...` : description}
        </p>
      </div>
      <div>
        <figure className="rating">
          <img src={Star} alt="podcastLogo" />
          <figcaption>5.0</figcaption>
        </figure>
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
        <button type="button" aria-label="more-options-button" className="more-options-button" />
      </div>
    </div>
  );
}

export default ListablePodcast;
