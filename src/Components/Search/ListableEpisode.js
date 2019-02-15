import React from 'react';
import PropTypes from 'prop-types';
import Episode from '../../Models/Episode';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';
import DownloadButton from './DownloadButton';

function ListableEpisode({
  setAudio, stop, data, episode, isPlaying, download, isDownloading,
}) {
  const toggleEpisode = () => {
    stop();
    if (episode.id !== data.id) {
      setAudio(data);
    } else if (!isPlaying) {
      setAudio(data);
    }
  };

  return (
    <div className="listable-episode">
      <h3>{data.title_original.length > 35 ? `${data.title_original.substring(0, 31)}...` : data.title_original}</h3>
      <div>
        <figure>
          <img src={data.thumbnail} alt="podcastlogo" />
        </figure>
        <p>
          <span>{data.podcast_title_original.length > 30 ? `${data.podcast_title_original.substring(0, 26)}...` : data.podcast_title_original}</span>
          <span>{`By ${data.publisher_original.length > 27 ? `${data.publisher_original.substring(0, 23)}...` : data.publisher_original}`}</span>
          <span>{`Relseed: ${getDatefromMilisecond(data.pub_date_ms)}`}</span>
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
          {data.description_original.length > 150 ? `${data.description_original.substring(0, 147)}...` : data.description_original}
        </p>
      </div>
      <div>
        <DownloadButton episode={data} isDownloading={isDownloading} download={download} />
        <button type="button" className={`${episode.id === data.id && isPlaying ? 'pause-button' : 'play-button'}`} onClick={toggleEpisode} />
        <button type="button" className="more-options-button" />
      </div>
    </div>
  );
}

ListableEpisode.propTypes = {
  data: PropTypes.objectOf(Episode).isRequired,
  setAudio: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  episode: PropTypes.shape(Episode).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isDownloading: PropTypes.string.isRequired,
};

export default ListableEpisode;
