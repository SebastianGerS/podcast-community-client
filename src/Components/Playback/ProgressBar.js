import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStartingPoint, getSecondsPerPixel } from '../../Helpers/UserAgent';
import { formatTime } from '../../Helpers/Time';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleDrag(e) {
    const { getDuration, seek } = this.props;
    const duration = getDuration();

    const newPosition = ((e.clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    seek(newPosition);
  }

  handleTouch(e) {
    const { getDuration, seek } = this.props;
    const duration = getDuration();
    const { clientX } = e.changedTouches[0];
    const newPosition = ((clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    seek(newPosition);
  }

  render() {
    const { getDuration, pos } = this.props;
    const duration = getDuration();
    const precent = pos && duration ? (pos / duration) * 100 : 0;

    const style = {
      width: `${precent > 100 ? 100 : precent}%`,
    };


    return (
      <div className="progress-bar">
        <div className="info">
          <p>{formatTime(pos)}</p>
          <p>{`- ${formatTime(duration - pos)}`}</p>
        </div>
        <div className="bar">
          <div className="start" />
          <div className="line">
            <div className="progress" style={style} onDragEnd={e => this.handleDrag(e)}>
              <div draggable className="marker" onDragEnd={this.handleDrag} onTouchEnd={this.handleTouch} />
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
};
export default ProgressBar;
