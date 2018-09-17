import React from 'react';
import PropTypes from 'prop-types';
import Episode from '../../Models/Episode';

const PlaybackBar = ({
  episode, isPlaying, togglePlay, forward,
}) => {
  const title = typeof episode.title_original === 'string' ? episode.title_original : '';
  const thumbnail = typeof episode.thumbnail === 'string' ? episode.thumbnail : 'https://via.placeholder.com/35x35';

  return (
    <div className="playbackbar">
      <figure>
        <img src={thumbnail} alt="podcast-thumb" className="podcast-thumb" />
        <figcaption>
          {title.length > 23 ? `${title.substring(0, 20)}...` : title}
        </figcaption>
      </figure>
      <div className="playback-controles">
        <button type="button" className={isPlaying ? 'pause' : 'play'} onClick={togglePlay} />
        <button type="button" className="forward" onClick={forward} />
      </div>
    </div>
  );
};


PlaybackBar.propTypes = {
  episode: PropTypes.shape(Episode).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
};

export default PlaybackBar;
