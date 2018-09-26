import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';
import PlaybackModal from './PlaybackModal';
import PlaybackBar from './PlaybackBar';
import Episode from '../../Models/Episode';
import ErrorBoundray from '../../Containers/ErrorBoundray';
import { savePosInLocalStorage, checkifInPosList, getEpisodePosFromList } from '../../Helpers/Downloads';

class PlaybackInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: 0,
      timer: undefined,
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.seek = this.seek.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.getSeek = this.getSeek.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.setSeek = this.setSeek.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { timer } = this.state;
    const { episode, src } = this.props;
    if (nextProps.startEpisode && typeof nextProps.episode.id === 'string') {
      setTimeout(this.togglePlay, 200);
    } else if (!nextProps.isPlaying && timer) {
      this.stopTimer();
    }

    if (nextProps.src !== src && typeof episode.id === 'string' && this.getSeek() !== 0) {
      savePosInLocalStorage({ id: episode.id, pos: this.getSeek() });
    }
    if (nextProps.src !== src && checkifInPosList(nextProps.episode.id)) {
      setTimeout(() => this.setSeek(getEpisodePosFromList(nextProps.episode.id)), 250);
    }
    return true;
  }

  componentWillUnmount() {
    const { episode } = this.props;
    savePosInLocalStorage({ id: episode.id, pos: this.getSeek() });
  }

  getSeek() {
    if (this.player) {
      return this.player.seek();
    }

    return 0;
  }

  setSeek(value) {
    if (this.player) {
      this.player.seek(value);
    }
  }

  getDuration() {
    if (this.player) {
      return this.player.duration();
    }

    return 0;
  }


  togglePlay() {
    const {
      play, stop, isPlaying, episode,
    } = this.props;
    if (typeof episode.id === 'string') {
      if (isPlaying) {
        stop();
        this.stopTimer();
      } else {
        play();
        this.handleTimer();
      }
    }
  }

  startTimer(cb) {
    const timer = setInterval(cb, 1000);
    this.setState({
      timer,
    });
  }

  stopTimer() {
    const { timer } = this.state;
    clearInterval(timer);
    this.setState({
      timer: undefined,
    });
  }

  handleTimer() {
    const { timer } = this.state;

    if (!timer) {
      this.startTimer(this.updatePosition);
    } else {
      this.stopTimer();
      this.startTimer(this.updatePosition);
    }
  }

  updatePosition() {
    const pos = this.getSeek();
    this.setState({
      pos,
    });
  }

  seek(pos) {
    let currentPosition = this.getSeek();
    const duration = this.getDuration();
    const { timer } = this.state;

    if (pos < 0) {
      currentPosition = 0;
    } else if (pos > duration) {
      currentPosition = duration;
    } else {
      currentPosition = pos;
    }
    this.setSeek(currentPosition);

    if (!timer) {
      this.updatePosition();
    }
  }

  forward() {
    let currentPosition = this.getSeek();
    const duration = this.getDuration();
    if ((currentPosition + 15) > duration) {
      currentPosition = duration;
    } else {
      currentPosition += 15;
    }

    this.setSeek(currentPosition);
  }

  backward() {
    let currentPosition = this.getSeek();

    if ((currentPosition - 15) < 0) {
      currentPosition = 0;
    } else {
      currentPosition -= 15;
    }

    this.setSeek(currentPosition);
  }

  render() {
    const {
      toggleModal, modalIsActive, menuIsActive, episode, isPlaying, src,
    } = this.props;
    const { pos } = this.state;
    const size = modalIsActive ? 'medium' : '';
    const type = modalIsActive ? 'modal' : 'bar';
    let layoutPos;

    if (modalIsActive) {
      layoutPos = 'top';
    } else if (menuIsActive) {
      layoutPos = 'bottom-1';
    } else {
      layoutPos = 'bottom-2';
    }
    return (
      <div className={`playbackinterface ${type} ${layoutPos} ${size}`}>
        <div className="toggle">
          <button type="button" aria-label="toggle-playback-modal-button " className={modalIsActive ? 'fold' : 'expand'} onClick={() => toggleModal('playback', modalIsActive)} />
        </div>
        { !modalIsActive
        && (
        <PlaybackBar
          isPlaying={isPlaying}
          togglePlay={this.togglePlay}
          episode={episode}
          seek={this.seek}
          forward={this.forward}

        />
        )
        }
        { modalIsActive
          && (
          <PlaybackModal
            isPlaying={isPlaying}
            togglePlay={this.togglePlay}
            episode={episode}
            seek={this.seek}
            backward={this.backward}
            forward={this.forward}
            getDuration={this.getDuration}
            getSeek={this.getSeek}
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
              ref={ref => (this.player = ref)}
              html5
            />
          </ErrorBoundray>
          )
       }

      </div>
    );
  }
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
};
export default PlaybackInterface;
