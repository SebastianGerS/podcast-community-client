import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Episode } from '../../Models/Episode';
import PlayButton from '../../Containers/Common/PlayButton';
import Rating from '../Common/Rating';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import InfoBox from '../Common/InfoBox';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';
import Loader from '../Layout/Loader';
import usePrevious from '../../Helpers/CustomHooks';
import { RedirectModel } from '../../Models/Redirect';

interface Props {
  episodeId: string;
  episode: Episode;
  isFetching: boolean;
  getEpisode: (episodeId: string) => void;
  redirect: RedirectModel;
}

function EpisodeComponent({
  episodeId, episode, isFetching, getEpisode, redirect,
}: Props): JSX.Element {
  const prevIsFetching = usePrevious(isFetching);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    getEpisode(episodeId);
  }, []);

  useLayoutEffect(() => {
    setFetchedData(!isFetching && prevIsFetching && episodeId === episode.id);
  }, [episodeId, episode]);

  const renderRedirect = (): JSX.Element | null => (
    typeof redirect.to === 'string' ? <Redirect to={redirect.to} /> : null
  );

  const title = typeof episode.title === 'string' ? episode.title : '';
  const description = typeof episode.description === 'string' ? episode.description : '';
  const epiosdeLength = typeof episode.audio_length === 'number'
    ? `${Math.round(episode.audio_length / 60)} min`
    : 'unknown';
  const episodeReleaseDate = typeof episode.pub_date_ms === 'number'
    ? getDatefromMilisecond(episode.pub_date_ms)
    : 'unknown relesedate';
  const podcastId = typeof episode.podcast_id === 'string' ? episode.podcast_id : '';

  return fetchedData ? (
    <div className="episode">
      <h3 className="episode-title">{ title }</h3>
      <div className="episode-img">
        <figure>
          <img src={typeof episode.image === 'string' ? episode.image : ''} alt="podcastlogo" />
        </figure>
      </div>
      <div className="episode-info-boxes">
        <InfoBox text={episodeReleaseDate} />
        <InfoBox icon={Star} alt="star" text="5.0" />
        <InfoBox text={epiosdeLength} />
      </div>
      <div className="episode-description">
        <p>
          {description}
        </p>
      </div>
      <div className="episode-controls">
        <Rating />
        <PlayButton episode={episode} />
        <MoreOptionsButton />
      </div>
      <Link to={`/podcasts/${podcastId}`}>
        <button className="episode-go-to-podcast" type="button">Go to Podcast</button>
      </Link>
    </div>
  ) : (
    <div>
      {renderRedirect()}
      <Loader />
    </div>
  );
}

export default EpisodeComponent;
