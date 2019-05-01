import React, { useEffect } from 'react';
import { Episode } from '../../Models/Episode';
import List from '../Common/List';
import PodcastEpisode from '../../Containers/Podcasts/PodcastEpisode';
import Loader from '../Layout/Loader';

interface Props {
  episodes: Episode[];
  getEpisodes: (podcastId: string, nextOffset?: number) => void;
  podcastId: string;
  isFetchingEpisodes: boolean;
  isFetchingPodcast: boolean;
  nextOffset?: number;
  morePages: boolean;
}

function Episodes({
  episodes, getEpisodes, podcastId, isFetchingEpisodes, nextOffset, morePages, isFetchingPodcast,
}: Props): JSX.Element {
  const onScroll = (): void => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)
      && Array.isArray(episodes) && morePages
    ) {
      window.removeEventListener('scroll', onScroll, false);

      getEpisodes(podcastId, nextOffset);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);

    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  }, [episodes]);


  return !isFetchingPodcast && Array.isArray(episodes) ? (
    <div className="episodes">
      <div className="episodes-header"><h3>Episodes</h3></div>
      <List component={PodcastEpisode} data={episodes} />
      {isFetchingEpisodes ? <Loader /> : null}
    </div>
  ) : <Loader />;
}

export default Episodes;
