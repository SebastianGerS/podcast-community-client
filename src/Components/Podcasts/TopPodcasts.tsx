import React, { useEffect } from 'react';
import ListablePodcast from './ListablePodcast';
import List from '../Common/List';
import { Podcast } from '../../Models/Podcast';

interface Props {
  getTopPodcasts: () => Promise<void>;
  topPodcasts: Podcast[];
}

function TopPodcasts({ getTopPodcasts, topPodcasts }: Props): JSX.Element | null {
  useEffect(() => {
    if (typeof topPodcasts[0].id !== 'string') {
      getTopPodcasts();
    }
  }, [topPodcasts]);

  return typeof topPodcasts[0].id === 'string' ? (
    <div>
      <List data={topPodcasts} component={ListablePodcast} />
    </div>
  ) : null;
}

export default TopPodcasts;
