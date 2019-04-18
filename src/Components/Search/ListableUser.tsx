import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../Models/User';
import FollowButton from '../../Containers/Common/FollowButton';
import { useSocket } from '../../Helpers/CustomHooks';

interface Props {
  data: User;
  socket: any;
  updateUserSearchResults: (user: User) => void;
}

function ListableUser({ data, socket, updateUserSearchResults }: Props): JSX.Element {
  const userId = typeof data._id === 'string' ? data._id : '';

  useSocket(socket, `users/${userId}`, updateUserSearchResults);

  return (
    <div className="listable-user">
      <FollowButton targetUser={data} type="icon" />
      <div>
        <Link to={`/profile/${data._id}`}>
          <figure>
            <img src={typeof data.profile_img.thumb === 'string' ? data.profile_img.thumb : ''} alt="podcastlogo" />
          </figure>
          <p>
            {data.username}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ListableUser;
