import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import ProgressBar from './ProgressBar';
import { Episode } from '../../Models/Episode';

interface Props {
  episode: Episode;
  isPlaying: boolean;
  togglePlay: () => void;
  seek: (time?: number) => void;
  forward: () => void;
  backward: () => void;
  pos: number;
  getDuration: () => number;
}

const PlaybackModal = ({
  episode, isPlaying, togglePlay, seek, backward, forward, pos, getDuration,
}: Props): JSX.Element => {
  const title = typeof episode.title_original === 'string' ? episode.title_original : '';
  const image = typeof episode.image === 'string' ? episode.image : 'https://via.placeholder.com/375x375';

  return (
    <div className="playbackmodal">
      <figure>
        <img src={image} alt="podcast-img" className="podcast-img" />
      </figure>
      <ProgressBar episode={episode} seek={seek} pos={pos} getDuration={getDuration} />
      <p>{title}</p>
      <Flipped inverseFlipId="player" scale>
        <div className="playback-controles">
          <button type="button" aria-label="backward-button" className="backward" onClick={backward} />
          <button
            type="button"
            aria-label={isPlaying ? 'pause-button' : 'play-button'}
            className={isPlaying ? 'pause' : 'play'}
            onClick={togglePlay}
          />
          <button type="button" aria-label="forward-button" className="forward" onClick={forward} />
        </div>
      </Flipped>
    </div>
  );
};

export default PlaybackModal;
