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

function PodcastEpisode({ data }: Props): JSX.Element {
  const title = typeof data.title_original === 'string' ? data.title_original : '';
  const description = typeof data.description_original === 'string' ? data.description_original : '';
  const episodeId = typeof data.id === 'string' ? data.id : '';
  const epiosdeLength = typeof data.audio_length === 'string'
    ? `${Math.round(getSecondsFromTimeString(data.audio_length) / 60)} min`
    : 'unknown';
  const episodeReleaseDate = typeof data.pub_date_ms === 'number'
    ? getDatefromMilisecond(data.pub_date_ms)
    : 'unknown relesedate';

  return (
    <div className="listable-episode">
      <Link to={`/episodes/${episodeId}`}>
        <h3 className="listable-episode-title">{title.length > 35 ? `${title.substring(0, 31)}...` : title}</h3>
        <div className="listable-episode-info-boxes">
          <InfoBox text={episodeReleaseDate} />
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
        <MoreOptionsButton />
      </div>
    </div>
  );
}

export default PodcastEpisode;
