import React from 'react';
import PropTypes from 'prop-types';
import Episode from '../../Models/Episode';
import Loading from '../../Assets/Icons/loader.svg';
import Checkmark from '../../Assets/Icons/checkmark.svg';
import { isDowloaded } from '../../Helpers/Downloads';

const DownloadButton = ({ episode, download, isDownloading }) => {
  let html;

  if (isDownloading === episode.id) {
    html = <img src={Loading} className="downloading-icon" alt="isdowloading" />;
  } else if (isDowloaded(episode.id)) {
    html = <img src={Checkmark} className="downloaded-icon" alt="isdowloading" />;
  } else {
    html = <button type="button" className="dowload-button" onClick={() => download(episode)} />;
  }

  return (html);
};

DownloadButton.proptype = {
  episode: PropTypes.shape(Episode).isRequired,
  download: PropTypes.func.isRequired,
  isDowloading: PropTypes.bool.isRequired,
};

export default DownloadButton;
