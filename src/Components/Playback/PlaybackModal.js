import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import Episode from '../../Models/Episode';

const PlaybackModal = ({
  episode, isPlaying, togglePlay, seek, backward, forward, pos, getDuration,
}) => {
  const title = typeof episode.title_original === 'string' ? episode.title_original : '';
  const image = typeof episode.image === 'string' ? episode.image : 'https://via.placeholder.com/375x375';

  return (
    <div className="playbackmodal">
      <figure>
        <img src={image} alt="podcast-img" className="podcast-img" />
      </figure>
      <ProgressBar episode={episode} seek={seek} pos={pos} getDuration={getDuration} />
      <p>{title}</p>
      <div className="playback-controles">
        <button type="button" className="backward" onClick={backward} />
        <button type="button" className={isPlaying ? 'pause' : 'play'} onClick={togglePlay} />
        <button type="button" className="forward" onClick={forward} />
      </div>
    </div>
  );
};

PlaybackModal.propTypes = {
  episode: PropTypes.shape(Episode).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  backward: PropTypes.func.isRequired,
  pos: PropTypes.number.isRequired,
  getDuration: PropTypes.func.isRequired,
};

export default PlaybackModal;
