import React, { useEffect } from 'react';
import { Episode } from '../../Models/Episode';
import List from '../Common/List';
import PodcastEpisode from './PodcastEpisode';
import { EpisodesSearchData } from '../../Actions/Podcast';
import Loader from '../Layout/Loader';

interface Props {
  episodes: Episode[];
  getEpisodes: (data: EpisodesSearchData) => void;
  podcastTitle: string;
  podcastId: string;
  isFetchingEpisodes: boolean;
  isFetchingPodcast: boolean;
  offset: number;
  morePages: boolean;
}

function Episodes({
  episodes, getEpisodes, podcastTitle, podcastId, isFetchingEpisodes, offset, morePages, isFetchingPodcast,
}: Props): JSX.Element {
  useEffect(() => {
    if (podcastTitle.length > 0 && podcastId.length > 0 && !isFetchingPodcast) {
      getEpisodes({
        term: podcastTitle, offset, ocid: podcastId,
      });
    }
  }, [podcastTitle, podcastId]);

  const onScroll = (): void => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)
      && Array.isArray(episodes) && morePages
    ) {
      window.removeEventListener('scroll', onScroll, false);

      getEpisodes({
        term: podcastTitle, offset, ocid: podcastId,
      });
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
