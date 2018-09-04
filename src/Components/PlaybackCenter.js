import React, { Component } from 'react';
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
      isExpanded: false,
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal() {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded,
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
    const {
      episode, isPlaying, isExpanded,
    } = this.state;

    return (
      <div className={`playbackcenter ${isExpanded ? 'top modal' : 'bottom bar'}`}>
        <div className="toggle">
          <button type="button" className={isExpanded ? 'fold' : 'expand'} onClick={this.toggleModal} />
        </div>
        { !isExpanded
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
        { isExpanded
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

export default PlaybackCenter;
