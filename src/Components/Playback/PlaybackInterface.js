import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';
import PlaybackModal from './PlaybackModal';
import PlaybackBar from './PlaybackBar';
import Episode from '../../Models/Episode';
import ErrorBoundray from '../../Containers/ErrorBoundray';
import { savePosInLocalStorage, checkifInPosList, getEpisodePosFromList } from '../../Helpers/Downloads';
import { getMediumModalHeight } from '../../Helpers/UserAgent';
import usePrevious from '../../Helpers/CustomHooks';

function PlaybackInterface({
  startEpisode, play, stop, toggleModal, modalIsActive,
  menuIsActive, episode, isPlaying, src, height,
}) {
  const [pos, setPos] = useState(0);
  const [timer, setTimer] = useState(undefined);
  const [player, setPlayer] = useState(undefined);

  const prevPos = usePrevious(pos);
  const prevEpisode = usePrevious(episode);

  const getSeek = () => {
    if (player) {
      return player.seek();
    }

    return 0;
  };

  const setSeek = (value) => {
    if (player) {
      player.seek(value);
    }
  };

  const getDuration = () => {
    if (player) {
      return player.duration();
    }

    return 0;
  };

  const startTimer = (cb) => {
    const newTimer = setInterval(cb, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(undefined);
  };

  const updatePosition = () => {
    const newPos = getSeek();
    setPos(newPos);
  };

  const handleTimer = () => {
    if (!timer) {
      startTimer(updatePosition);
    } else {
      stopTimer();
      startTimer(updatePosition);
    }
  };

  const togglePlay = () => {
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

  const seek = (newPos) => {
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

  const forward = () => {
    let currentPosition = getSeek();
    const duration = getDuration();
    if ((currentPosition + 15) > duration) {
      currentPosition = duration;
    } else {
      currentPosition += 15;
    }

    setSeek(currentPosition);
  };

  const backward = () => {
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

        if (prevPos !== 0 && typeof prevPos !== 'object') {
          savePosInLocalStorage({ id: prevEpisode.id, pos: prevPos });
        }
      }
    }
  }, [player, src, startEpisode]);

  useEffect(() => {
    if (player && prevPos !== 0 && typeof prevPos !== 'object') {
      const newPos = prevEpisode.id === episode.id ? pos : prevPos;
      savePosInLocalStorage({ id: prevEpisode.id, pos: newPos });
    }
  }, [isPlaying]);

  const type = modalIsActive ? 'modal' : 'bar';

  let layoutPos;
  const style = {};

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
        <button type="button" aria-label="toggle-playback-modal-button " className={modalIsActive ? 'fold' : 'expand'} onClick={() => toggleModal('playback', modalIsActive)} />
      </div>
      { !modalIsActive
      && (
      <PlaybackBar
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        episode={episode}
        seek={seek}
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
          getSeek={getSeek}
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

PlaybackInterface.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  modalIsActive: PropTypes.bool.isRequired,
  menuIsActive: PropTypes.bool.isRequired,
  episode: PropTypes.shape(Episode).isRequired,
  startEpisode: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};
export default PlaybackInterface;
