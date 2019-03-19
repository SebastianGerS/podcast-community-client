import React from 'react';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';
import DownloadButton from '../Search/DownloadButton';
import { Episode } from '../../Models/Episode';
import MoreOptionsButton from '../Common/MoreOptionsButton';

interface Props {
  setAudio: (data: Episode) => void;
  stop: () => void;
  data: Episode;
  episode: Episode;
  isPlaying: boolean;
  download: () => void;
  isDownloading: string;
}

function PodcastEpisode({
  data, stop, setAudio, episode, download, isDownloading, isPlaying,
}: Props): JSX.Element {
  const toggleEpisode = (): void => {
    stop();
    if (episode.id !== data.id) {
      setAudio(data);
    } else if (!isPlaying) {
      setAudio(data);
    }
  };

  const title = typeof data.title === 'string' ? data.title : '';
  const description = typeof data.description === 'string' ? data.description : '';

  return (
    <div className="listable-episode">
      <h3>{title.length > 35 ? `${title.substring(0, 31)}...` : title}</h3>

      <div>
        <div className="info-box">
          <p>
            <span>
              {typeof data.pub_date_ms === 'number' ? getDatefromMilisecond(data.pub_date_ms) : 'unknown relesedate'}
            </span>
          </p>
        </div>
        <figure className="info-box">
          <img src={Star} alt="star" />
          <figcaption>5.0</figcaption>
        </figure>
        <div className="info-box">
          <p>
              length:&ensp;
            <span>
              {typeof data.audio_length === 'number' ? `${Math.round(data.audio_length / 60)} min` : 'unknown'}
            </span>
          </p>
        </div>
      </div>
      <div>
        <p>
          {description.length > 150 ? `${description.substring(0, 147)}...` : description}
        </p>
      </div>
      <div>
        <DownloadButton episode={data} isDownloading={isDownloading} download={download} />
        <button
          type="button"
          className={`${episode.id === data.id && isPlaying ? 'pause-button' : 'play-button'}`}
          onClick={toggleEpisode}
        />
        <MoreOptionsButton />
      </div>
    </div>
  );
}

export default PodcastEpisode;
