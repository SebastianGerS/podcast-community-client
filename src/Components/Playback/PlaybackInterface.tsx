import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler';
import PlaybackModal from './PlaybackModal';
import PlaybackBar from './PlaybackBar';
import ErrorBoundray from '../../Containers/Helpers/ErrorBoundray';
import { savePosInLocalStorage, checkifInPosList, getEpisodePosFromList } from '../../Helpers/Downloads';
import { getMediumModalHeight } from '../../Helpers/UserAgent';
import usePrevious from '../../Helpers/CustomHooks';
import { Episode } from '../../Models/Episode';

interface Props {
  toggleModal: () => void;
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
  modalIsActive: boolean;
  menuIsActive: boolean;
  episode: Episode;
  startEpisode: boolean;
  src: string;
  height: number;
}

interface Style {
  height?: number;
}

interface ReactHowlerExtended extends ReactHowler {
  seek: (time?: number) => number;
}

function PlaybackInterface({
  startEpisode, play, stop, toggleModal, modalIsActive,
  menuIsActive, episode, isPlaying, src, height,
}: Props): JSX.Element {
  const [pos, setPos] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined | number>(undefined);
  const [player, setPlayer] = useState<ReactHowlerExtended| null>(null);

  const prevPos = usePrevious<number>(pos);
  const prevEpisode = usePrevious<Episode>(episode);

  const getSeek = (): number => {
    if (player) {
      return player.seek();
    }

    return 0;
  };

  const setSeek = (value: number): void => {
    if (player) {
      player.seek(value);
    }
  };

  const getDuration = (): number => {
    if (player) {
      return player.duration();
    }

    return 0;
  };

  const startTimer = (cb: () => void): void => {
    const newTimer = setInterval(cb, 1000);
    setTimer(newTimer);
  };

  const stopTimer = (): void => {
    clearInterval(typeof timer === 'number' ? timer : undefined);
    setTimer(undefined);
  };

  const updatePosition = (): void => {
    const newPos = getSeek();
    setPos(newPos);
  };

  const handleTimer = (): void => {
    if (!timer) {
      startTimer(updatePosition);
    } else {
      stopTimer();
      startTimer(updatePosition);
    }
  };

  const togglePlay = (): void => {
    if (typeof episode.id === 'string') {
      if (isPlaying) {
        stop();
        stopTimer();
      } else {
        play();
        handleTimer();
      }
    }
  };

  const seek = (newPos: number): void => {
    let currentPosition = getSeek();
    const duration = getDuration();

    if (newPos < 0) {
      currentPosition = 0;
    } else if (newPos > duration) {
      currentPosition = duration;
    } else {
      currentPosition = newPos;
    }
    setSeek(currentPosition);

    if (!timer) {
      updatePosition();
    }
  };

  const forward = (): void => {
    let currentPosition = getSeek();
    const duration = getDuration();
    if ((currentPosition + 15) > duration) {
      currentPosition = duration;
    } else {
      currentPosition += 15;
    }

    setSeek(currentPosition);
  };

  const backward = (): void => {
    let currentPosition = getSeek();

    if ((currentPosition - 15) < 0) {
      currentPosition = 0;
    } else {
      currentPosition -= 15;
    }

    setSeek(currentPosition);
  };

  useEffect(() => {
    if (player) {
      if (startEpisode && typeof episode.id === 'string') {
        togglePlay();
      }

      if (typeof episode.id === 'string' && startEpisode) {
        if (checkifInPosList(episode.id)) {
          setSeek(getEpisodePosFromList(episode.id));
        }
        if (prevEpisode) {
          if (prevPos !== 0 && typeof prevPos !== 'object') {
            savePosInLocalStorage({ id: typeof prevEpisode.id === 'string' ? prevEpisode.id : '', pos: prevPos });
          }
        }
      }
    }
  }, [player, src, startEpisode]);

  useEffect(() => {
    if (pos && prevEpisode) {
      if (player && prevPos !== 0 && typeof prevPos !== 'object') {
        const newPos = prevEpisode.id === episode.id ? pos : prevPos;
        savePosInLocalStorage({ id: typeof prevEpisode.id === 'string' ? prevEpisode.id : '', pos: newPos });
      }
    }
  }, [isPlaying]);

  const type = modalIsActive ? 'modal' : 'bar';

  let layoutPos;
  const style: Style = {};

  if (modalIsActive) {
    layoutPos = 'top';
    style.height = getMediumModalHeight(height);
  } else if (menuIsActive) {
    layoutPos = 'bottom-1';
  } else {
    layoutPos = 'bottom-2';
  }
  return (
    <div className={`playbackinterface ${type} ${layoutPos}`} style={style}>
      <div className="toggle">
        <button
          type="button"
          aria-label="toggle-playback-modal-button"
          className={modalIsActive ? 'fold' : 'expand'}
          onClick={() => toggleModal()}
        />
      </div>
      { !modalIsActive
      && (
        <PlaybackBar
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          episode={episode}
          forward={forward}
        />
      )
      }
      { modalIsActive
        && (
          <PlaybackModal
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            episode={episode}
            seek={seek}
            backward={backward}
            forward={forward}
            getDuration={getDuration}
            pos={pos}
          />
        )
      }
      {
        /* eslint-disable no-return-assign */
        typeof episode.id === 'string'
        && (
          <ErrorBoundray>
            <ReactHowler
              src={src}
              playing={isPlaying}
              volume={1}
              preload
              format={['mp3', 'webm']}
              ref={playerRef => (setPlayer(playerRef))}
              html5
            />
          </ErrorBoundray>
        )
      }
    </div>
  );
}

export default PlaybackInterface;
