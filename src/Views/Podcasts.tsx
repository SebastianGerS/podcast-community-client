import React, { useEffect } from 'react';
import Podcast from '../Containers/Podcasts/Podcast';
import { scrollToTop } from '../Helpers/UserAgent';

interface Props {
  params: {
    podcastId: string;
  };
}

function Podcasts({ params }: Props): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Podcasts">
      <Podcast podcastId={params.podcastId} />
    </div>
  );
}

export default Podcasts;
