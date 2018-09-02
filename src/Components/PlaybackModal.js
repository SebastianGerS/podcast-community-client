import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const PlaybackModal = ({
  episode, isPlaying, togglePlay,
}) => (
  <div className="playbackmodal">
    <figure>
      <img src={episode.thumbImg} alt="podcast-img" className="podcast-img" />
    </figure>
    <ProgressBar />
    <p>{episode.title}</p>
    <div className="playback-controles">
      <button type="button" className="backward" />
      <button type="button" className={isPlaying ? 'pause' : 'play'} onClick={togglePlay} />
      <button type="button" className="forward" />
    </div>
  </div>
);

PlaybackModal.propTypes = {
  episode: PropTypes.objectOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
};

export default PlaybackModal;
