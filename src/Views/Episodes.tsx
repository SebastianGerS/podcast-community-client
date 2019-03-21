import React, { useEffect } from 'react';
import Episode from '../Containers/Episodes/Episode';
import { scrollToTop } from '../Helpers/UserAgent';

interface Props {
  params: {
    episodeId: string;
  };
}

function Episodes({ params }: Props): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Episodes">
      <Episode episodeId={params.episodeId} />
    </div>
  );
}

export default Episodes;
