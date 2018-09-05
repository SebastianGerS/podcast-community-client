import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaybackModal from './PlaybackModal';
import PlaybackBar from './PlaybackBar';

class PlaybackCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: {
        thumbImg: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png',
        title: 'Solo -- Why Is There Something Rather than Nothing?',
        currentPosition: 0,
        episodeLength: 4800,
      },
      isPlaying: false,
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
  }

  togglePlay() {
    const { isPlaying } = this.state;
    this.setState({
      isPlaying: !isPlaying,
    });
  }

  updatePosition(pos) {
    const { episode } = this.state;

    if (pos < 0) {
      episode.currentPosition = 0;
    } else if (pos > episode.episodeLength) {
      episode.currentPosition = episode.episodeLength;
    } else {
      episode.currentPosition = pos;
    }
    this.setState({
      ...episode,
    });
  }

  forward() {
    const { episode } = this.state;

    if ((episode.currentPosition + 15) > episode.episodeLength) {
      episode.currentPosition = episode.episodeLength;
    } else {
      episode.currentPosition += 15;
    }

    this.setState({
      episode,
    });
  }

  backward() {
    const { episode } = this.state;

    if ((episode.currentPosition - 15) < 0) {
      episode.currentPosition = 0;
    } else {
      episode.currentPosition -= 15;
    }

    this.setState({
      episode,
    });
  }

  render() {
    const { episode, isPlaying } = this.state;
    const { toggleModal, modalIsActive, menuIsActive } = this.props;
    const size = modalIsActive ? 'medium' : '';
    const type = modalIsActive ? 'modal' : 'bar';
    let pos;

    if (modalIsActive) {
      pos = 'top';
    } else if (menuIsActive) {
      pos = 'bottom-1';
    } else {
      pos = 'bottom-2';
    }

    return (
      <div className={`playbackcenter ${type} ${pos} ${size}`}>
        <div className="toggle">
          <button type="button" className={modalIsActive ? 'fold' : 'expand'} onClick={() => toggleModal('playback', modalIsActive)} />
        </div>
        { !modalIsActive
        && (
        <PlaybackBar
          isPlaying={isPlaying}
          togglePlay={this.togglePlay}
          episode={episode}
          updatePosition={this.updatePosition}
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
            updatePosition={this.updatePosition}
            backward={this.backward}
            forward={this.forward}
          />
          )
        }
      </div>
    );
  }
}
PlaybackCenter.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalIsActive: PropTypes.bool.isRequired,
};
export default PlaybackCenter;
