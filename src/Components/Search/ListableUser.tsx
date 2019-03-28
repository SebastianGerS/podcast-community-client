import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../Models/User';
import FollowButton from '../../Containers/Common/FollowButton';
import RequestConfirmation from '../../Containers/Follows/RequestConfirmation';

interface Props {
  data: User;
  hasRequestConfirmation: boolean;
}

const ListableUser = ({ data, hasRequestConfirmation }: Props): JSX.Element => (
  <div className={`listable-user ${hasRequestConfirmation ? 'has-confirmation' : ''}`}>
    {!hasRequestConfirmation && <FollowButton targetUser={data} type="icon" />}
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

export default ListableUser;
