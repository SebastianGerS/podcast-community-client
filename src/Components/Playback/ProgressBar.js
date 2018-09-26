import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStartingPoint, getSecondsPerPixel } from '../../Helpers/UserAgent';
import { formatTime, getSecondsFromTimeString } from '../../Helpers/Time';
import Episode from '../../Models/Episode';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDraging: false,
      dragPosition: 0,
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { pos } = this.props;
    const { isDraging } = this.state;

    if (pos !== nextProps.pos && isDraging) {
      this.setState({
        isDraging: false,
      });
    }

    return true;
  }

  handleDragEnd(e) {
    const { getDuration, seek, episode } = this.props;
    const duration = typeof getDuration() === 'number' ? getDuration() : getSecondsFromTimeString(episode.audio_length);

    const newPosition = ((e.clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    seek(newPosition);
  }

  handleDrag(e) {
    const { getDuration, episode } = this.props;
    const { isDraging } = this.state;

    if (!isDraging) {
      this.setState({
        isDraging: true,
      });
    }

    const duration = typeof getDuration() === 'number' ? getDuration() : getSecondsFromTimeString(episode.audio_length);

    const newPosition = ((e.clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    this.setState({
      dragPosition: newPosition,
    });
  }

  handleTouchEnd(e) {
    const { getDuration, seek, episode } = this.props;
    const duration = typeof getDuration() === 'number' ? getDuration() : getSecondsFromTimeString(episode.audio_length);
    const { clientX } = e.changedTouches[0];
    const newPosition = ((clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    seek(newPosition);
  }

  handleTouch(e) {
    const { getDuration, episode } = this.props;
    const { isDraging } = this.state;
    if (!isDraging) {
      this.setState({
        isDraging: true,
      });
    }
    const duration = typeof getDuration() === 'number' ? getDuration() : getSecondsFromTimeString(episode.audio_length);
    const { clientX } = e.changedTouches[0];
    const newPosition = ((clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    this.setState({
      dragPosition: newPosition,
    });
  }

  render() {
    const { getDuration, pos, episode } = this.props;
    const { isDraging, dragPosition } = this.state;
    const duration = typeof getDuration() === 'number' ? getDuration() : getSecondsFromTimeString(episode.audio_length);
    let precent;
    if (isDraging) {
      precent = dragPosition && duration ? (dragPosition / duration) * 100 : 0;
    } else {
      precent = pos && duration ? (pos / duration) * 100 : 0;
    }

    const style = {
      width: `${precent > 100 ? 100 : precent}%`,
    };

    return (
      <div className="progress-bar">
        <div className="info">
          <p>{typeof pos === 'number' ? formatTime(pos) : formatTime(0)}</p>
          <p>{`- ${typeof pos === 'number' ? formatTime(duration - pos) : formatTime(duration)}`}</p>
        </div>
        <div className="bar">
          <div className="start" />
          <div className="line">
            <div className="progress" style={style} onDragEnd={e => this.handleDragEnd(e)}>
              <div draggable className="marker" onDragEnd={this.handleDragEnd} onTouchEnd={this.handleTouchEnd} onDrag={this.handleDrag} onTouchMove={this.handleTouch} />
            </div>
          </div>
          <div className="end" style={precent >= 100 ? { backgroundColor: '#FEF6F6' } : {}} />
        </div>
      </div>
    );
  }
}
ProgressBar.propTypes = {
  getDuration: PropTypes.func.isRequired,
  pos: PropTypes.number.isRequired,
  seek: PropTypes.func.isRequired,
  episode: PropTypes.shape(Episode).isRequired,
};
export default ProgressBar;
