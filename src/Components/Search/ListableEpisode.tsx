import React from 'react';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';
import DownloadButton from './DownloadButton';
import { Episode } from '../../Models/Episode';

interface Props {
  setAudio: (data: Episode) => void;
  stop: () => void;
  data: Episode;
  episode: Episode;
  isPlaying: boolean;
  download: () => void;
  isDownloading: string;
}

function ListableEpisode({
  setAudio, stop, data, episode, isPlaying, download, isDownloading,
}: Props): JSX.Element {
  const toggleEpisode = (): void => {
    stop();
    if (episode.id !== data.id) {
      setAudio(data);
    } else if (!isPlaying) {
      setAudio(data);
    }
  };
  const episodeTitle = typeof data.title_original === 'string' ? data.title_original : '';
  const podcastTitle = typeof data.podcast_title_original === 'string' ? data.podcast_title_original : '';
  const publisher = typeof data.publisher_original === 'string' ? data.publisher_original : '';
  const description = typeof data.description_original === 'string' ? data.description_original : '';

  return (
    <div className="listable-episode">
      <h3>{episodeTitle.length > 35 ? `${episodeTitle.substring(0, 31)}...` : episodeTitle}</h3>
      <div>
        <figure>
          <img src={typeof data.thumbnail === 'string' ? data.thumbnail : ''} alt="podcastlogo" />
        </figure>
        <p>
          <span>{podcastTitle.length > 30 ? `${podcastTitle.substring(0, 26)}...` : podcastTitle}</span>
          <span>{`By ${publisher.length > 27 ? `${publisher.substring(0, 23)}...` : publisher}`}</span>
          <span>
            {`Relseed: ${typeof data.pub_date_ms === 'number' ? getDatefromMilisecond(data.pub_date_ms) : '—'}`}
          </span>
        </p>
      </div>
      <div>
        <figure className="info-box">
          <img src={Star} alt="star" />
          <figcaption>5.0</figcaption>
        </figure>
        <div className="info-box">
          <p>
              length:&ensp;
            <span>
              {data.audio_length}
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
        <button type="button" className="more-options-button" />
      </div>
    </div>
  );
}

export default ListableEpisode;
