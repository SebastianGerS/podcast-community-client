import React from 'react';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond, getSecondsFromTimeString } from '../../Helpers/Time';
import DownloadButton from '../../Containers/Common/DownloadButton';
import { Episode } from '../../Models/Episode';
import MoreOptionsButton from '../Common/MoreOptionsButton';
import PlayButton from '../../Containers/Common/PlayButton';

interface Props {
  data: Episode;
}

function PodcastEpisode({ data }: Props): JSX.Element {
  const title = typeof data.title_original === 'string' ? data.title_original : '';
  const description = typeof data.description_original === 'string' ? data.description_original : '';

  return (
    <div className="listable-episode">
      <h3>{title.length > 35 ? `${title.substring(0, 31)}...` : title}</h3>

      <div>
        <div className="info-box">
          <p>
            {typeof data.pub_date_ms === 'number' ? getDatefromMilisecond(data.pub_date_ms) : 'unknown relesedate'}
          </p>
        </div>
        <figure className="info-box">
          <img src={Star} alt="star" />
          <figcaption>5.0</figcaption>
        </figure>
        <div className="info-box">
          <p>
            {
              typeof data.audio_length === 'string'
                ? `${Math.round(getSecondsFromTimeString(data.audio_length) / 60)} min`
                : 'unknown'
            }
          </p>
        </div>
      </div>
      <div>
        <p>
          {description.length > 150 ? `${description.substring(0, 147)}...` : description}
        </p>
      </div>
      <div>
        <DownloadButton episode={data} />
        <PlayButton episode={data} />
        <MoreOptionsButton />
      </div>
    </div>
  );
}

export default PodcastEpisode;
