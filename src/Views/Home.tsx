import React, { useEffect } from 'react';
import TopPodcasts from '../Containers/Podcasts/TopPodcasts';
import { scrollToTop } from '../Helpers/UserAgent';

function Home(): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Home">
      <h2>Top Podcasts</h2>
      <TopPodcasts />
    </div>
  );
}

export default Home;
