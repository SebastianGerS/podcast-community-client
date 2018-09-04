import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStartingPoint, formatTime, getSecondsPerPixel } from '../Helpers/Helpers';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDrag(e) {
    const { episode, updatePosition } = this.props;
    const { episodeLength } = episode;

    const newPosition = ((e.clientX - getStartingPoint()) * getSecondsPerPixel(episodeLength));

    updatePosition(newPosition);
  }

  render() {
    const { episode } = this.props;
    const { currentPosition, episodeLength } = episode;
    const precent = (currentPosition / episodeLength) * 100;

    const style = {
      width: `${precent > 100 ? 100 : precent}%`,
    };


    return (
      <div className="progress-bar">
        <div className="info">
          <p>{formatTime(currentPosition)}</p>
          <p>{`- ${formatTime(episodeLength - currentPosition)}`}</p>
        </div>
        <div className="bar">
          <div className="start" />
          <div className="line">
            <div className="progress" style={style} onDragEnd={e => this.handleDrag(e)}>
              <div draggable className="marker" onDrag={this.handleDrag} />
            </div>
          </div>
          <div className="end" style={precent >= 100 ? { backgroundColor: '#FEF6F6' } : {}} />
        </div>
      </div>
    );
  }
}
ProgressBar.propTypes = {
  episode: PropTypes.shape({
    thumbImg: PropTypes.string,
    title: PropTypes.string,
    currentPosition: PropTypes.number,
    episodeLength: PropTypes.number,
  }).isRequired,
  updatePosition: PropTypes.func.isRequired,
};
export default ProgressBar;
