import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';
import UserInfo from './UserInfo';
import Loader from '../Layout/Loader';

function Profile({
  getUser, userId, user, currentUserId, updateUser,
}) {
  const username = typeof user.username === 'string' ? user.username : '';
  const age = typeof user.age === 'number' ? user.age : null;
  const email = typeof user.email === 'string' ? user.email : '';
  const bio = typeof user.bio === 'string' ? user.bio : '';

  useEffect(() => {
    getUser(userId);
  }, []);

  return typeof user._id === 'string' ? (
    <div className="profile">
      <div className="profile-top">
        <figure>
          <img src={user.profile_img.large} alt="profile" className="profile-img" />
        </figure>
        <div>
          <p className="info">{`Subscribtions: ${user.subscriptions.length}`}</p>
          <p className="info">{`Following: ${user.following.length}`}</p>
          <p className="info">{`Followers: ${user.followers.length}`}</p>
        </div>
      </div>
      <div className="profile-bottom">
        <UserInfo info={{ value: username, name: 'username' }} user={user} currentUserId={currentUserId} updateUser={updateUser} />
        <UserInfo info={{ value: age, name: 'age' }} user={user} currentUserId={currentUserId} updateUser={updateUser} />
        <UserInfo info={{ value: email, name: 'email' }} user={user} currentUserId={currentUserId} updateUser={updateUser} />
        <UserInfo info={{ value: bio, name: 'bio' }} user={user} currentUserId={currentUserId} updateUser={updateUser} />
      </div>
    </div>
  ) : <Loader />;
}

Profile.propTypes = {
  user: PropTypes.shape(User).isRequired,
  currentUserId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Profile;
