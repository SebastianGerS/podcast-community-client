import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const PlaybackModal = ({
  episode, isPlaying, togglePlay, updatePosition, backward, forward,
}) => (
  <div className="playbackmodal">
    <figure>
      <img src={episode.thumbImg} alt="podcast-img" className="podcast-img" />
    </figure>
    <ProgressBar episode={episode} updatePosition={updatePosition} />
    <p>{episode.title}</p>
    <div className="playback-controles">
      <button type="button" className="backward" onClick={backward} />
      <button type="button" className={isPlaying ? 'pause' : 'play'} onClick={togglePlay} />
      <button type="button" className="forward" onClick={forward} />
    </div>
  </div>
);

PlaybackModal.propTypes = {
  episode: PropTypes.shape({
    thumbImg: PropTypes.string,
    title: PropTypes.string,
    currentPosition: PropTypes.number,
    episodeLength: PropTypes.number,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  backward: PropTypes.func.isRequired,
};

export default PlaybackModal;
