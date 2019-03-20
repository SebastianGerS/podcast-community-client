import React, { useEffect } from 'react';
import { Podcast } from '../../Models/Podcast';
import Loader from '../Layout/Loader';
import SubscribeButton from '../../Containers/Common/SubscribeButton';
import Rating from '../Common/Rating';
import MoreOptionsButton from '../Common/MoreOptionsButton';
import Episodes from '../../Containers/Podcasts/Episodes';

interface Props {
  podcast: Podcast;
  isFetching: boolean;
  getPodcast: (podcastId: string) => void;
  podcastId: string;
}

function PodcastComponent({
  podcast, isFetching, getPodcast, podcastId,
}: Props): JSX.Element {
  useEffect(() => {
    getPodcast(podcastId);
  }, []);

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

  return !isFetching ? (
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
        <Rating />
        <SubscribeButton podcastId={podcastId} />
        <MoreOptionsButton />
      </div>
      <Episodes podcastTitle={title} podcastId={podcastId} />
    </div>
  ) : <Loader />;
}

export default PodcastComponent;
