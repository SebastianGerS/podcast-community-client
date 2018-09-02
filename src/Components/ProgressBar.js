import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: 0,
      episodeLength: 4800,
    };
  }

  render() {
    const { currentPosition, episodeLength } = this.state;
    const style = {
      width: `${(currentPosition / episodeLength) * 100}%`,
    };


    return (
      <div className="progress-bar">
        <div className="info">
          <p>14:50</p>
          <p>-1:06:41</p>
        </div>
        <div className="bar">
          <div className="start" />
          <div className="line">
            <div className="progress" style={style}>
              <div className="marker" />
            </div>
          </div>
          <div className="end" />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
