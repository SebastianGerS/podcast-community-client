import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { Episode } from '../../Models/Episode';

interface Props {
  episode: Episode;
  isPlaying: boolean;
  togglePlay: () => void;
  forward: () => void;
}
const PlaybackBar = ({
  episode, isPlaying, togglePlay, forward,
}: Props): JSX.Element => {
  const title = typeof episode.title_original === 'string' ? episode.title_original : '';
  const thumbnail = typeof episode.thumbnail === 'string' ? episode.thumbnail : 'https://via.placeholder.com/35x35';

  return (
    <Flipped inverseFlipId="player" scale>
      <div className="playbackbar">
        <figure>
          <img src={thumbnail} alt="podcast-thumb" className="podcast-thumb" />
          <figcaption>
            {title.length > 23 ? `${title.substring(0, 20)}...` : title}
          </figcaption>
        </figure>
        <div className="playback-controles">
          <button
            type="button"
            aria-label={isPlaying ? 'pause-button' : 'play-button'}
            className={isPlaying ? 'pause' : 'play'}
            onClick={togglePlay}
          />
          <button type="button" aria-label="forward-button" className="forward" onClick={forward} />
        </div>
      </div>
    </Flipped>
  );
};

export default PlaybackBar;
