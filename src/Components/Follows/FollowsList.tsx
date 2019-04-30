import React from 'react';
import Immutable from 'immutable';
import { User } from '../../Models/User';
import List from '../Common/List';
import FollowsModalUser from '../../Containers/Follows/FollowsModalUser';
import { Session } from '../../Models/Session';


interface Props {
  toggleFollowsModal: () => void;
  followers: User[];
  following: User[];
  followSessions: Immutable.List<Session>;
}

function FollowsList({
  toggleFollowsModal, followers, following, followSessions,
}: Props): JSX.Element {
  const online = [
    ...following.filter(
      user => typeof user._id === 'string' && followSessions.findIndex(value => value.user === user._id) !== -1,
    ),
  ];

  const offline = [
    ...following.filter(
      user => typeof user._id === 'string' && followSessions.findIndex(value => value.user === user._id) === -1,
    ),
  ];

  followers.map((user) => {
    if (typeof user._id === 'string') {
      let toBeAdded = true;
      if (followSessions.findIndex(value => value.user === user._id) !== -1) {
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

  const onlineProps = { online: true, toggleFollowsModal };
  const offlineProps = { online: false, toggleFollowsModal };

  return (
    <div className="follows-modal">
      <button
        title="close"
        className="close-follows-modal"
        type="button"
        onClick={() => toggleFollowsModal()}
      />
      {online.length + offline.length > 0
        ? (
          <div>
            <div>
              <h3>Online</h3>
              <List component={FollowsModalUser} data={online} {...onlineProps} />
            </div>
            <div>
              <h3>Offline</h3>
              <List component={FollowsModalUser} data={offline} {...offlineProps} />
            </div>
          </div>
        )
        : <p className="no-follows">{'You don\'t have any followers yeat'}</p>
      }
    </div>
  );
}

export default FollowsList;
