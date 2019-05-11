import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Markup } from 'interweave';
import moment from 'moment';
import { Episode } from '../../Models/Episode';
import PlayButton from '../../Containers/Common/PlayButton';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import InfoBox from '../Common/InfoBox';
import Loader from '../Layout/Loader';
import DownloadButton from '../../Containers/Common/DownloadButton';
import { getRatingIcon } from '../../Helpers/Utils';
import { Rating } from '../../Models/Rating';
import { useSocket } from '../../Helpers/CustomHooks';

interface Props {
  episodeId: string;
  episode: Episode;
  isFetching: boolean;
  socket: any;
  ratings: Rating[];
  getEpisode: (episodeId: string) => void;
  resetEpisode: () => void;
  setRating: (rating: Rating) => void;
  resetRatings: () => void;
}

function EpisodeComponent({
  episodeId, episode, isFetching, getEpisode, socket, setRating, ratings, resetEpisode, resetRatings,
}: Props): JSX.Element {
  const title = typeof episode.title === 'string' ? episode.title : '';
  const description = typeof episode.description === 'string' ? episode.description : '';
  const epiosdeLength = typeof episode.audio_length === 'number'
    ? `${Math.round(episode.audio_length / 60)} min`
    : 'unknown';
  const episodeReleaseDate = typeof episode.pub_date_ms === 'number'
    ? moment(episode.pub_date_ms).format('DD/MM YYYY')
    : 'unknown relesedate';
  const podcastId = typeof episode.podcast_id === 'string' ? episode.podcast_id : '';

  const [newEpisodeRating] = ratings.filter(rating => rating.itemId === episodeId);

  const rating = newEpisodeRating ? newEpisodeRating.rating : episode.avrageRating;

  const ratingIcon = getRatingIcon(typeof rating === 'number' ? rating : 0);

  useEffect(() => {
    if (typeof episode.id !== 'string') {
      getEpisode(episodeId);
    }

    return () => {
      resetEpisode();
      resetRatings();
    };
  }, [socket]);

  useSocket(socket, `episodes/${episodeId}/rating`, setRating);

  return !isFetching && typeof episode.id === 'string' ? (
    <div className="episode">
      <Markup content={title} tagName="h3" />
      <div className="episode-img">
        <figure>
          <img src={typeof episode.image === 'string' ? episode.image : ''} alt="podcastlogo" />
        </figure>
      </div>
      <div className="episode-info-boxes">
        <InfoBox text={episodeReleaseDate} />
        <InfoBox
          icon
          iconClass={ratingIcon}
          text={rating !== 0 && typeof rating === 'number' ? rating.toFixed(1) : ' - '}
        />
        <InfoBox text={epiosdeLength} />
      </div>
      <div className="episode-description">
        <Markup content={description} />
      </div>
      <div className="episode-controls">
        <DownloadButton episode={episode} />
        <PlayButton episode={episode} />
        <MoreOptionsButton item={episode} />
      </div>
      <Link to={`/podcasts/${podcastId}`}>
        <button className="episode-go-to-podcast" type="button">Go to Podcast</button>
      </Link>
    </div>
  ) : <Loader />;
}

export default EpisodeComponent;
