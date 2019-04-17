import React from 'react';
import { User } from '../../Models/User';

interface Props {
  data: User;
  online: boolean;
}

const FollowsModalUser = ({ data, online }: Props): JSX.Element => {
  const profileImg = typeof data.profile_img.thumb === 'string' ? data.profile_img.thumb : '';
  return (
    <div className={`follows-modal-user ${online ? 'online' : 'offline'}`}>
      <figure>
        <img src={profileImg} alt="profile" />
      </figure>
      <div>
        <p>{data.username}</p>
      </div>
    </div>
  );
};

export default FollowsModalUser;
