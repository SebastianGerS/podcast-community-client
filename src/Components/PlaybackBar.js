import React from 'react';
import PropTypes from 'prop-types';

const PlaybackBar = ({
  episode, isPlaying, togglePlay,
}) => (
  <div className="playbackbar">
    <figure>
      <img src={episode.thumbImg} alt="podcast-thumb" className="podcast-thumb" />
      <figcaption>
        {episode.title.length > 23 ? `${episode.title.substring(0, 20)}...` : episode.title}
      </figcaption>
    </figure>
    <div className="playback-controles">
      <button type="button" className={isPlaying ? 'pause' : 'play'} onClick={togglePlay} />
      <button type="button" className="forward" />
    </div>
  </div>
);

PlaybackBar.propTypes = {
  episode: PropTypes.objectOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
};

export default PlaybackBar;
