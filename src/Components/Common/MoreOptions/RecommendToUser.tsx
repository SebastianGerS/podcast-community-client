import React, { useState } from 'react';
import uuid from 'uuid';
import { Episode } from '../../../Models/Episode';
import { Podcast } from '../../../Models/Podcast';
import { User } from '../../../Models/User';


interface Props {
  toggleRecommendToUserModal: () => void;
  toggleMoreOptionsModal: () => void;
  recommendToUser: (userId: string, recommendation: object) => void;
  episode?: Episode;
  podcast?: Podcast;
  followers: User[];
}

function RecommendToUser({
  toggleRecommendToUserModal, episode, podcast, recommendToUser, followers, toggleMoreOptionsModal,
}: Props): JSX.Element {
  const [selectedUserId, setSelectedUserId] = useState<string|undefined>(undefined);

  const item = episode || podcast;

  const title = item ? typeof item.title === 'string' ? item.title : item.title_original : '';
  const episodePodcastTitle = item instanceof Episode
    ? typeof item.podcast_title === 'string'
      ? item.podcast_title
      : item.podcast_title_original
    : undefined;
  const itemId = item ? typeof item.id === 'string' ? item.id : '' : '';
  const image = item ? typeof item.image === 'string' ? item.image : '' : '';

  const recommend = (): void => {
    if (selectedUserId !== undefined) {
      const recommendation = {
        item: itemId,
        kind: item instanceof Episode ? 'Episode' : 'Podcast',
        image,
        title,
        podcast_title: episodePodcastTitle,
      };
      recommendToUser(selectedUserId, recommendation);
    }
  };

  const options = Array.isArray(followers) ? followers.map((follower) => {
    const userId = typeof follower._id === 'string' ? follower._id : '';
    return <option value={userId} key={uuid.v4()}>{follower.username}</option>;
  }) : [];

  return (
    <div className="recommend-to-user">
      <button
        className="close-recommend-to-user-modal-button"
        type="button"
        aria-label="close-recommend-to-user-modal-button"
        onClick={toggleRecommendToUserModal}
      />
      <div className="recommendation-form">
        <p>
          {title}
          {episodePodcastTitle ? ` — ${episodePodcastTitle}` : ''}
        </p>
        <select name="user" id="user" value={selectedUserId} onChange={e => setSelectedUserId(e.currentTarget.value)}>
          <option value={undefined}>Select a User</option>
          {options}
        </select>
        <button className="recommend-button" type="button" onClick={recommend}>Recommend</button>
        <button className="back-to-options-button" type="button" onClick={toggleMoreOptionsModal}>
          Back To Options
        </button>
      </div>
    </div>
  );
}
export default RecommendToUser;
