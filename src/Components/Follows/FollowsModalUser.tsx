import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../Models/User';

interface Props {
  data: User;
  online: boolean;
  toggleFollowsModal: () => void;
}

const FollowsModalUser = ({ data, online, toggleFollowsModal }: Props): JSX.Element => {
  const profileImg = typeof data.profile_img.thumb === 'string' ? data.profile_img.thumb : '';
  const userId = typeof data._id === 'string' ? data._id : '';

  return (
    <Link to={`/profile/${userId}`} onClick={toggleFollowsModal}>
      <div className={`follows-modal-user ${online ? 'online' : 'offline'}`}>
        <figure>
          <img src={profileImg} alt="profile" />
        </figure>
        <div>
          <p>{data.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default FollowsModalUser;
