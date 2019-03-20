import React, { useEffect } from 'react';
import { Episode } from '../../Models/Episode';
import List from '../Common/List';
import PodcastEpisode from '../../Containers/Podcasts/PodcastEpisode';
import { EpisodesSearchData } from '../../Actions/Podcast';
import Loader from '../Layout/Loader';

interface Props {
  episodes: Episode[];
  getEpisodes: (data: EpisodesSearchData) => void;
  podcastTitle: string;
  podcastId: string;
  isFetchingEpisodes: boolean;
  offset: number;
  morePages: boolean;
}

function Episodes({
  episodes, getEpisodes, podcastTitle, podcastId, isFetchingEpisodes, offset, morePages,
}: Props): JSX.Element {
  useEffect(() => {
    if (podcastTitle.length > 0 && podcastId.length > 0) {
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


  return Array.isArray(episodes) ? (
    <div className="episodes">
      <List component={PodcastEpisode} data={episodes} />
      {isFetchingEpisodes ? <Loader /> : null}
    </div>
  ) : <Loader />;
}

export default Episodes;
