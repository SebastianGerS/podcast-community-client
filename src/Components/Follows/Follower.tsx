import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../Models/User';
import RequestConfirmation from '../../Containers/Follows/RequestConfirmation';
import RemoveFollowerButton from '../../Containers/Follows/RemoveFollowerButton';

interface Props {
  data: User;
  hasRequestConfirmation: boolean;
}

const Follower = ({ data, hasRequestConfirmation }: Props): JSX.Element => (
  <div className={`listable-user ${hasRequestConfirmation ? 'has-confirmation' : ''}`}>
    {!hasRequestConfirmation && <RemoveFollowerButton targetUserId={typeof data._id === 'string' ? data._id : ''} />}
    <div>
      <Link to={`/profile/${data._id}`}>
        <figure>
          <img src={typeof data.profile_img.thumb === 'string' ? data.profile_img.thumb : ''} alt="podcastlogo" />
        </figure>
        <p>
          {data.username}
          {hasRequestConfirmation ? ' wants to follow you!' : ''}
        </p>
      </Link>
      {hasRequestConfirmation && <RequestConfirmation targetUserId={typeof data._id === 'string' ? data._id : ''} />}
    </div>
  </div>
);

export default Follower;
