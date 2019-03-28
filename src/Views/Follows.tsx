import React, { useEffect } from 'react';
import FollowsComponent from '../Containers/Follows/Follows';
import { scrollToTop } from '../Helpers/UserAgent';

function Follows(): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Follows">
      <FollowsComponent />
    </div>
  );
}

export default Follows;
