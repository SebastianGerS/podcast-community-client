import React from 'react';
import { Episode } from '../../Models/Episode';

interface Props {
  setAudio: (episode: Episode) => void;
  stop: () => void;
  episode: Episode;
  episodePlaying: Episode;
  isPlaying: boolean;
}

function PlayButton({
  episode, stop, setAudio, episodePlaying, isPlaying,
}: Props): JSX.Element {
  const toggleEpisode = (): void => {
    stop();
    if (episodePlaying.id !== episode.id) {
      setAudio(episode);
    } else if (!isPlaying) {
      setAudio(episode);
    }
  };

  return (
    <button
      type="button"
      className={`${episodePlaying.id === episode.id && isPlaying ? 'pause-button' : 'play-button'}`}
      onClick={toggleEpisode}
    />
  );
}

export default PlayButton;
