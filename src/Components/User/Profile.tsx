import React, { useEffect } from 'react';
import UserInfo from './UserInfo';
import Loader from '../Layout/Loader';
import { User } from '../../Models/User';

interface Props {
  getUser: (userId: string) => void;
  userId: string;
  user: User;
  currentUserId: string;
  updateUser: () => void;
  isAdmin: boolean;
}
function Profile({
  getUser, userId, user, currentUserId, updateUser, isAdmin,
}: Props): JSX.Element {
  const username = typeof user.username === 'string' ? user.username : '';
  const age = typeof user.age === 'number' ? user.age : undefined;
  const email = typeof user.email === 'string' ? user.email : '';
  const bio = typeof user.bio === 'string' ? user.bio : '';
  const followers = Array.isArray(user.followers) ? user.followers : [];

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  const isAutharized = (): boolean => {
    let auth = false;
    if (typeof user.type === 'string') {
      if (user.type === 'public') {
        auth = true;
      } else if (followers.includes(currentUserId)
        || (currentUserId === user._id && typeof currentUserId === 'string')
        || isAdmin) {
        auth = true;
      }
    }

    return auth;
  };

  const profileImage = typeof user.profile_img.large === 'string' ? user.profile_img.large : '';

  return typeof user._id === 'string' ? (
    <div className="profile">
      <div className="profile-top">
        <figure>
          <img src={profileImage} alt="profile" className="profile-img" />
        </figure>
        <div>
          <p className="info">{`Subscribtions: ${user.subscriptions.length}`}</p>
          <p className="info">{`Following: ${user.following.length}`}</p>
          <p className="info">{`Followers: ${user.followers.length}`}</p>
        </div>
      </div>
      <div className="profile-bottom">
        <UserInfo
          info={{ value: username, name: 'username' }}
          user={user}
          currentUserId={currentUserId}
          updateUser={updateUser}
        />
        { isAutharized() && (
          <div>
            <UserInfo
              info={{ value: age, name: 'age' }}
              user={user}
              currentUserId={currentUserId}
              updateUser={updateUser}
            />
            <UserInfo
              info={{ value: email, name: 'email' }}
              user={user}
              currentUserId={currentUserId}
              updateUser={updateUser}
            />
            <UserInfo
              info={{ value: bio, name: 'bio' }}
              user={user}
              currentUserId={currentUserId}
              updateUser={updateUser}
            />
          </div>
        )}
      </div>

    </div>
  ) : <Loader />;
}

export default Profile;
