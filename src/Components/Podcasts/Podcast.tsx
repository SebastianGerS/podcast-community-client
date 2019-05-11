import React, { useEffect } from 'react';
import { Markup } from 'interweave';
import { Podcast } from '../../Models/Podcast';
import Loader from '../Layout/Loader';
import SubscribeButton from '../../Containers/Common/SubscribeButton';
import RatingComponent from '../Common/Rating';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import Episodes from '../../Containers/Podcasts/Episodes';
import { Rating } from '../../Models/Rating';
import { useSocket } from '../../Helpers/CustomHooks';

interface Props {
  podcast: Podcast;
  isFetchingPodcast: boolean;
  podcastId: string;
  socket: any;
  ratings: Rating[];
  getPodcast: (podcastId: string, nextOffset?: number) => void;
  resetPodcast: () => void;
  setRating: (rating: Rating) => void;
  resetRatings: () => void;
}

function PodcastComponent({
  podcast, isFetchingPodcast, getPodcast, podcastId, socket, setRating, ratings, resetPodcast, resetRatings,
}: Props): JSX.Element {
  const [newPodcastRating] = ratings.filter((rating: Rating) => rating.itemId === podcastId);

  const rating = newPodcastRating ? newPodcastRating.rating : podcast.avrageRating;

  useEffect(() => {
    if (typeof podcast.id !== 'string') {
      getPodcast(podcastId);
    }

    return () => {
      resetPodcast();
      resetRatings();
    };
  }, [socket]);

  useSocket(socket, `podcasts/${podcastId}/rating`, setRating);

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

  return !isFetchingPodcast && typeof podcast.id === 'string' ? (
    <div className="podcast">
      <h3 className="podcast-title">{ title }</h3>
      <div className="podcast-img">
        <figure>
          <img src={typeof podcast.image === 'string' ? podcast.image : ''} alt="podcastlogo" />
        </figure>
      </div>
      <div className="podcast-description">
        <Markup content={description} />
      </div>
      <div className="podcast-controls">
        <RatingComponent rating={typeof rating === 'number' ? rating : 0} />
        <SubscribeButton podcast={podcast} />
        <MoreOptionsButton item={podcast} />
      </div>
      <Episodes podcastId={podcastId} getEpisodes={getPodcast} />
    </div>
  ) : <Loader />;
}

export default PodcastComponent;
