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
      },
      isPlaying: false,
      isExpanded: false,
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
        && <PlaybackBar isPlaying={isPlaying} togglePlay={this.togglePlay} episode={episode} />
        }
        { isExpanded
          && <PlaybackModal isPlaying={isPlaying} togglePlay={this.togglePlay} episode={episode} />
        }
      </div>
    );
  }
}

export default PlaybackCenter;
