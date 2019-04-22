import React from 'react';
import { List } from 'immutable';
import { Link } from 'react-router-dom';
import { User } from '../../Models/User';
import { Session } from '../../Models/Session';
import { setMaxLength } from '../../Helpers/Utils';

interface Props {
  data: User;
  online: boolean;
  toggleFollowsModal: () => void;
  followSessions: List<Session>;
}

const FollowsModalUser = ({
  data, online, toggleFollowsModal, followSessions,
}: Props): JSX.Element => {
  const profileImg = typeof data.profile_img.thumb === 'string' ? data.profile_img.thumb : '';
  const userId = typeof data._id === 'string' ? data._id : '';

  const userSession = followSessions.findEntry(session => session.user === data._id);
  const listeningTo = userSession ? userSession[1].listening_to : undefined;

  const username = typeof data.username === 'string' ? setMaxLength(data.username, 40) : '';
  const title = listeningTo ? setMaxLength(typeof listeningTo.title === 'string' ? listeningTo.title : '', 40) : '';
  const podcastTitle = listeningTo ? setMaxLength(
    typeof listeningTo.podcast_title === 'string'
      ? listeningTo.podcast_title
      : '', 40,
  ) : '';

  return (
    <Link to={`/profile/${userId}`} onClick={toggleFollowsModal}>
      <div className={`follows-modal-user ${online ? 'online' : 'offline'}`}>
        <figure>
          <img src={profileImg} alt="profile" />
        </figure>
        <div>
          {listeningTo
            ? <p>{`${username} — ${title} from ${podcastTitle}`}</p>
            : <p>{data.username}</p>
          }
        </div>
      </div>
    </Link>
  );
};

export default FollowsModalUser;
