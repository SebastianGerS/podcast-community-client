import React from 'react';
import Loading from '../../Assets/Icons/loader.svg';
import Checkmark from '../../Assets/Icons/checkmark.svg';
import { isDowloaded } from '../../Helpers/Downloads';
import { Episode } from '../../Models/Episode';

interface Props {
  episode: Episode;
  download: (episode: Episode) => void;
  isDownloading: string;
}
function DownloadButton({ episode, download, isDownloading }: Props): JSX.Element {
  const downloadEpisode = (): void => {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const win = window.open(typeof episode.audio === 'string' ? episode.audio : '', '_blank');
      if (win) {
        win.focus();
      }
    } else {
      download(episode);
    }
  };

  let html;

  if (isDownloading === episode.id) {
    html = <img src={Loading} className="downloading-icon" alt="isdowloading" />;
  } else if (isDowloaded(typeof episode.id === 'string' ? episode.id : '')) {
    html = <img src={Checkmark} className="downloaded-icon" alt="isdowloading" />;
  } else {
    html = <button type="button" className="dowload-button" onClick={downloadEpisode} />;
  }

  return (html);
}

export default DownloadButton;
