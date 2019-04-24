import React, { useEffect, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UserInfo from './UserInfo';
import Loader from '../Layout/Loader';
import { User } from '../../Models/User';
import FollowButton from '../../Containers/Common/FollowButton';
import { useSocket } from '../../Helpers/CustomHooks';
import { isImage } from '../../Helpers/Utils';

interface Props {
  getUser: (userId: string) => void;
  userId: string;
  user: User;
  currentUserId: string;
  updateUser: (userId: string, data: object) => void;
  isAdmin: boolean;
  socket: any;
  setUpdatedUser: (user: User) => void;
  isUpdating: boolean;
  isFetching: boolean;
}

function Profile({
  getUser, userId, user, currentUserId, updateUser, isAdmin, socket, setUpdatedUser, isUpdating, isFetching,
}: Props): JSX.Element {
  const username = typeof user.username === 'string' ? user.username : '';
  const age = typeof user.age === 'number' ? user.age : undefined;
  const email = typeof user.email === 'string' ? user.email : '';
  const bio = typeof user.bio === 'string' ? user.bio : '';
  const followers = Array.isArray(user.followers) ? user.followers : [];
  const profileImage = typeof user.profile_img.large === 'string' ? user.profile_img.large : '';

  const [newProfileImage, setNewProfileImage] = useState<string|undefined>();

  const onDrop = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];

    if (isImage(newFile)) {
      if (newProfileImage) {
        URL.revokeObjectURL(newProfileImage);
      }

      setNewProfileImage(URL.createObjectURL(newFile));
    }

    const imageForm = new FormData();
    imageForm.append('profileImg', newFile);

    updateUser(userId, imageForm);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useSocket(socket, `users/${userId}`, setUpdatedUser);

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  useEffect(() => {
    if (!isUpdating && !isFetching && newProfileImage) {
      URL.revokeObjectURL(newProfileImage);
      setNewProfileImage(undefined);
    }
  }, [isUpdating, isFetching]);

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

  return typeof user._id === 'string' ? (
    <div className="profile">
      <div className="profile-top">
        <figure {...getRootProps({ className: 'profile-img' })}>
          <input {...getInputProps({ multiple: false })} />
          <img
            className={`${isDragActive ? 'is-draging ' : ''}${isUpdating && newProfileImage ? 'is-saving' : ''}`}
            src={newProfileImage || profileImage}
            alt="profile"
          />
        </figure>
        <div>
          <p className="info">{`Subscribtions: ${user.subscriptions.length}`}</p>
          <p className="info">{`Following: ${user.following.length}`}</p>
          <p className="info">{`Followers: ${user.followers.length}`}</p>
          {currentUserId !== user._id && <FollowButton targetUser={user} type="button" />}
        </div>
      </div>
      <div className="profile-bottom">
        <UserInfo
          info={{ value: username, name: 'username' }}
          user={user}
          currentUserId={currentUserId}
          updateUser={updateUser}
          isUpdateing={isUpdating}
          isFetching={isFetching}
        />
        { isAutharized() && (
          <div>
            <UserInfo
              info={{ value: age, name: 'age' }}
              user={user}
              currentUserId={currentUserId}
              updateUser={updateUser}
              isUpdateing={isUpdating}
              isFetching={isFetching}
            />
            <UserInfo
              info={{ value: email, name: 'email' }}
              user={user}
              currentUserId={currentUserId}
              updateUser={updateUser}
              isUpdateing={isUpdating}
              isFetching={isFetching}
            />
            <UserInfo
              info={{ value: bio, name: 'bio' }}
              user={user}
              currentUserId={currentUserId}
              updateUser={updateUser}
              isUpdateing={isUpdating}
              isFetching={isFetching}
            />
          </div>
        )}
      </div>

    </div>
  ) : <Loader />;
}

export default Profile;
