import React from 'react';
import { Link } from 'react-router-dom';
import { Markup } from 'interweave';
import { getDatefromMilisecond, getSecondsFromTimeString } from '../../Helpers/Time';
import DownloadButton from '../../Containers/Common/DownloadButton';
import { Episode } from '../../Models/Episode';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import PlayButton from '../../Containers/Common/PlayButton';
import InfoBox from '../Common/InfoBox';
import { Rating } from '../../Models/Rating';
import { getRatingIcon, setMaxLength } from '../../Helpers/Utils';
import { useSocket } from '../../Helpers/CustomHooks';
import ImageLink from '../Common/ImageLink';

interface Props {
  data: Episode;
  ratings: Rating[];
  socket: any;
  setRating: (rating: Rating) => void;
}

function ListableEpisode({
  data, ratings, socket, setRating,
}: Props): JSX.Element {
  const episodeTitle = typeof data.title_original === 'string' ? data.title_original : '';
  const podcastTitle = typeof data.podcast_title_original === 'string' ? data.podcast_title_original : '';
  const publisher = typeof data.publisher_original === 'string' ? data.publisher_original : '';
  const description = typeof data.description_original === 'string' ? data.description_original : '';
  const episodeId = typeof data.id === 'string' ? data.id : '';
  const epiosdeLength = typeof data.audio_length === 'string'
    ? `${Math.round(getSecondsFromTimeString(data.audio_length) / 60)} min`
    : 'unknown';
  const [newEpisodeRating] = ratings.filter(rating => rating.itemId === episodeId);

  const rating = newEpisodeRating ? newEpisodeRating.rating : data.avrageRating;

  const ratingIcon = getRatingIcon(typeof rating === 'number' ? rating : 0);

  useSocket(socket, `episodes/${episodeId}/rating`, setRating);

  return (
    <div className="listable-episode">
      <Link to={`/episodes/${episodeId}`}>
        <Markup content={setMaxLength(episodeTitle, 35)} tagName="h3" />
      </Link>
      <div className="listable-episode-info">
        <ImageLink
          imageSrc={typeof data.thumbnail === 'string' ? data.thumbnail : ''}
          imageAlt="podcastlogo"
          linkTo={`/episodes/${episodeId}`}
        />
        <p>
          <span>{setMaxLength(podcastTitle, 30)}</span>
          <span>{`By ${setMaxLength(publisher, 27)}`}</span>
          <span>
            {`Relseed: ${typeof data.pub_date_ms === 'number' ? getDatefromMilisecond(data.pub_date_ms) : '—'}`}
          </span>
        </p>
      </div>
      <div className="listable-episode-info-boxes">
        <InfoBox text={typeof rating === 'number' ? rating.toFixed(1) : ' - '} iconClass={ratingIcon} icon />
        <InfoBox text={epiosdeLength} />
      </div>
      <div className="listable-episode-description">
        <Markup content={setMaxLength(description, 100)} />
      </div>
      <div className="listable-episode-controls">
        <DownloadButton episode={data} />
        <PlayButton episode={data} />
        <MoreOptionsButton item={data} />
      </div>
    </div>
  );
}

export default ListableEpisode;
