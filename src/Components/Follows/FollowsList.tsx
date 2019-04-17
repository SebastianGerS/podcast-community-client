import React from 'react';
import Immutable from 'immutable';
import { User } from '../../Models/User';
import List from '../Common/List';
import FollowsModalUser from './FollowsModalUser';


interface Props {
  toggleFollowsModal: () => void;
  followers: User[];
  following: User[];
  onlineUsers: Immutable.List<string>;
}

function FollowsList({
  toggleFollowsModal, followers, following, onlineUsers,
}: Props): JSX.Element {
  const online = [
    ...following.filter(user => typeof user._id === 'string' && onlineUsers.contains(user._id)),
  ];

  const offline = [
    ...following.filter(user => typeof user._id === 'string' && !onlineUsers.contains(user._id)),
  ];

  followers.map((user) => {
    if (typeof user._id === 'string') {
      let toBeAdded = true;
      if (onlineUsers.contains(user._id)) {
        online.map((onlineUser) => {
          if (onlineUser._id === user._id) {
            toBeAdded = false;
          }
          return onlineUser;
        });
        if (toBeAdded) {
          online.push(user);
        }
      } else {
        offline.map((offlineUser) => {
          if (offlineUser._id === user._id) {
            toBeAdded = false;
          }
          return offlineUser;
        });

        if (toBeAdded) {
          offline.push(user);
        }
      }
    }

    return user;
  });

  const onlineProps = { online: true };
  const offlineProps = { online: false };

  return (
    <div className="follows-modal">
      <button
        className="close-follows-modal"
        type="button"
        onClick={() => toggleFollowsModal()}
      />
      <div>
        <h3>Online</h3>
        <List component={FollowsModalUser} data={online} {...onlineProps} />
      </div>
      <div>
        <h3>Offline</h3>
        <List component={FollowsModalUser} data={offline} {...offlineProps} />
      </div>
    </div>
  );
}

export default FollowsList;
