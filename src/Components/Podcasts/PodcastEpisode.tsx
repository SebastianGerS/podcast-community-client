import React from 'react';
import { Link } from 'react-router-dom';
import { Markup } from 'interweave';
import moment from 'moment';
import DownloadButton from '../../Containers/Common/DownloadButton';
import { Episode } from '../../Models/Episode';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import PlayButton from '../../Containers/Common/PlayButton';
import InfoBox from '../Common/InfoBox';
import { Rating } from '../../Models/Rating';
import { getRatingIcon, setMaxLength } from '../../Helpers/Utils';
import { useSocket } from '../../Helpers/CustomHooks';

interface Props {
  data: Episode;
  ratings: Rating[];
  setRating: (rating: Rating) => void;
  socket: any;
}

function PodcastEpisode({
  data, ratings, setRating, socket,
}: Props): JSX.Element {
  const title = typeof data.title === 'string' ? data.title : '';
  const description = typeof data.description === 'string' ? data.description : '';
  const episodeId = typeof data.id === 'string' ? data.id : '';
  const epiosdeLength = typeof data.audio_length === 'number'
    ? `${Math.round(data.audio_length / 60)} min`
    : 'unknown';
  const episodeReleaseDate = typeof data.pub_date_ms === 'number'
    ? moment(data.pub_date_ms).format('DD/MM YYYY')
    : 'unknown relesedate';

  const [newEpisodeRating] = ratings.filter(rating => rating.itemId === episodeId);

  const rating = newEpisodeRating ? newEpisodeRating.rating : data.avrageRating;

  const ratingIcon = getRatingIcon(typeof rating === 'number' ? rating : 0);

  useSocket(socket, `episodes/${episodeId}/rating`, setRating);

  return (
    <div className="listable-episode">
      <Link to={`/episodes/${episodeId}`}>
        <h3 className="listable-episode-title"><Markup content={setMaxLength(title, 35)} /></h3>
      </Link>
      <div className="listable-episode-info-boxes">
        <InfoBox text={episodeReleaseDate} />
        <InfoBox
          text={typeof rating === 'number' && rating > 0 ? rating.toFixed(1) : ' - '}
          iconClass={ratingIcon}
          icon
        />
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

export default PodcastEpisode;
