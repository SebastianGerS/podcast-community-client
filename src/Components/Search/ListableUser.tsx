import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../Models/User';
import FollowButton from '../../Containers/Common/FollowButton';

interface Props {
  data: User;
}

const ListableUser = ({ data }: Props): JSX.Element => (
  <div className="listable-user">
    <FollowButton targetUser={data} type="icon" />
    <div>
      <Link to={`/profile/${data._id}`}>
        <figure>
          <img src={typeof data.profile_img.thumb === 'string' ? data.profile_img.thumb : ''} alt="podcastlogo" />
        </figure>
        <p>{data.username}</p>
      </Link>
    </div>
  </div>
);

export default ListableUser;
