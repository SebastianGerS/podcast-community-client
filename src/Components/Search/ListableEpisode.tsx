import React from 'react';
import { Link } from 'react-router-dom';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond, getSecondsFromTimeString } from '../../Helpers/Time';
import DownloadButton from '../../Containers/Common/DownloadButton';
import { Episode } from '../../Models/Episode';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import PlayButton from '../../Containers/Common/PlayButton';
import InfoBox from '../Common/InfoBox';

interface Props {
  data: Episode;
}

function ListableEpisode({ data }: Props): JSX.Element {
  const episodeTitle = typeof data.title_original === 'string' ? data.title_original : '';
  const podcastTitle = typeof data.podcast_title_original === 'string' ? data.podcast_title_original : '';
  const publisher = typeof data.publisher_original === 'string' ? data.publisher_original : '';
  const description = typeof data.description_original === 'string' ? data.description_original : '';
  const episodeId = typeof data.id === 'string' ? data.id : '';
  const epiosdeLength = typeof data.audio_length === 'string'
    ? `${Math.round(getSecondsFromTimeString(data.audio_length) / 60)} min`
    : 'unknown';

  return (
    <div className="listable-episode">
      <Link to={`/episodes/${episodeId}`}>
        <h3 className="listable-episode-title">
          {episodeTitle.length > 35 ? `${episodeTitle.substring(0, 31)}...` : episodeTitle}
        </h3>
        <div className="listable-episode-info">
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
        <div className="listable-episode-info-boxes">
          <InfoBox text="5.0" icon={Star} alt="star" />
          <InfoBox text={epiosdeLength} />
        </div>
        <div className="listable-episode-description">
          <p>
            {description.length > 150 ? `${description.substring(0, 147)}...` : description}
          </p>
        </div>
      </Link>
      <div className="listable-episode-controls">
        <DownloadButton episode={data} />
        <PlayButton episode={data} />
        <MoreOptionsButton item={data} />
      </div>
    </div>
  );
}

export default ListableEpisode;
