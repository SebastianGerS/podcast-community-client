import React from 'react';
import { Episode } from '../../Models/Episode';
import List from '../Common/List';
import PodcastEpisode from '../../Containers/Podcasts/PodcastEpisode';

interface Props {
  episodes: Episode[];
}

function Episodes({ episodes }: Props): JSX.Element {
  return (
    <div className="episodes">
      <List component={PodcastEpisode} data={episodes} />
    </div>
  );
}

export default Episodes;
