import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Episode from '../../Models/Episode';
import Loading from '../../Assets/Icons/loader.svg';
import Checkmark from '../../Assets/Icons/checkmark.svg';
import { isDowloaded } from '../../Helpers/Downloads';

class DownloadButton extends Component {
  constructor(props) {
    super(props);
    this.downloadEpisode = this.downloadEpisode.bind(this);
  }


  downloadEpisode() {
    const { episode, download } = this.props;
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const win = window.open(episode.audio, '_blank');
      win.focus();
    } else {
      download(episode);
    }
  }

  render() {
    const { episode, isDownloading } = this.props;

    let html;

    if (isDownloading === episode.id) {
      html = <img src={Loading} className="downloading-icon" alt="isdowloading" />;
    } else if (isDowloaded(episode.id)) {
      html = <img src={Checkmark} className="downloaded-icon" alt="isdowloading" />;
    } else {
      html = <button type="button" className="dowload-button" onClick={this.downloadEpisode} />;
    }

    return (html);
  }
}

DownloadButton.propTypes = {
  episode: PropTypes.shape(Episode).isRequired,
  download: PropTypes.func.isRequired,
  isDownloading: PropTypes.bool.isRequired,
};

export default DownloadButton;
