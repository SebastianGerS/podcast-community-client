import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Podcast } from '../../Models/Podcast';
import Loader from '../Layout/Loader';
import SubscribeButton from '../../Containers/Common/SubscribeButton';
import Rating from '../Common/Rating';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import Episodes from '../../Containers/Podcasts/Episodes';
import usePrevious from '../../Helpers/CustomHooks';
import { RedirectModel } from '../../Models/Redirect';
import { PodcastRatings } from '../../Actions/Podcast';

interface Props {
  podcast: Podcast;
  isFetchingPodcast: boolean;
  getPodcast: (podcastId: string) => void;
  podcastId: string;
  redirect: RedirectModel;
  socket: any;
  setRating: (rating: PodcastRatings) => void;
  avrageRating: number;
}

function PodcastComponent({
  podcast, isFetchingPodcast, getPodcast, podcastId, redirect, socket, setRating, avrageRating,
}: Props): JSX.Element {
  const prevIsFetchingPodcast = usePrevious(isFetchingPodcast);
  const [FetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    getPodcast(podcastId);
  }, []);

  useEffect(() => {
    let removeListener;
    if (socket && !socket.hasListeners(`podcasts/${podcastId}/rating`)) {
      socket.on(`podcasts/${podcastId}/rating`, setRating);

      removeListener = () => {
        socket.removeListener(`podcasts/${podcastId}/rating`, setRating);
      };
    }
    return removeListener;
  }, [socket]);

  useLayoutEffect(() => {
    setFetchedData(!isFetchingPodcast && prevIsFetchingPodcast && podcastId === podcast.id);
  }, [podcastId, podcast]);

  const title = (
    typeof podcast.title === 'string'
      ? podcast.title
      : typeof podcast.title_original === 'string'
        ? podcast.title_original
        : ''
  );

  const description = (
    typeof podcast.description === 'string'
      ? podcast.description
      : typeof podcast.description_original === 'string'
        ? podcast.description_original
        : ''
  );

  const renderRedirect = (): JSX.Element | null => (
    typeof redirect.to === 'string' ? <Redirect to={redirect.to} /> : null
  );

  return FetchedData ? (
    <div className="podcast">
      <h3 className="podcast-title">{ title }</h3>
      <div className="podcast-img">
        <figure>
          <img src={typeof podcast.image === 'string' ? podcast.image : ''} alt="podcastlogo" />
        </figure>
      </div>
      <div className="podcast-description">
        <p>
          {description}
        </p>
      </div>
      <div className="podcast-controls">
        <Rating rating={avrageRating} />
        <SubscribeButton podcast={podcast} />
        <MoreOptionsButton item={podcast} />
      </div>
      <Episodes podcastTitle={title} podcastId={podcastId} />
    </div>
  ) : (
    <div>
      {renderRedirect()}
      <Loader />
    </div>
  );
}

export default PodcastComponent;
