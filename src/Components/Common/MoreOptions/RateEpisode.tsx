import React, { useState } from 'react';
import { Episode } from '../../../Models/Episode';
import Rate from './Rate';

interface Props {
  toggleRateEpisodeModal: () => void;
  toggleMoreOptionsModal: () => void;
  rateEpisode: (podcastId: string, episodeRating: object) => void;
  episode: Episode;
}

function RateEpisode({
  toggleRateEpisodeModal, episode, rateEpisode, toggleMoreOptionsModal,
}: Props): JSX.Element {
  const [rating, setRating] = useState<number>(0);


  const title = typeof episode.title === 'string'
    ? episode.title
    : typeof episode.title_original === 'string'
      ? episode.title_original
      : '';
  const episodeId = typeof episode.id === 'string' ? episode.id : '';
  const podcastId = typeof episode.podcast_id === 'string' ? episode.podcast_id : '';


  const rate = (): void => {
    const episodeRating = {
      episodeId,
      rating,
    };

    rateEpisode(podcastId, episodeRating);
  };

  return (
    <div className="rate-episode">
      <button
        className="close-rate-episode-modal-button"
        type="button"
        aria-label="close-rate-episode-modal-button"
        onClick={toggleRateEpisodeModal}
      />
      <div className="rate-form">
        <p>{title}</p>
        <Rate rating={rating} setRating={setRating} />
        <button className="rate-button" type="button" onClick={rate}>Rate</button>
        <button className="back-to-options-button" type="button" onClick={toggleMoreOptionsModal}>
          Back To Options
        </button>
      </div>
    </div>
  );
}
export default RateEpisode;
