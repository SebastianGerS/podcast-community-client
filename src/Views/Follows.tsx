import React, { useEffect } from 'react';
import FollowsComponent from '../Containers/Follows/Follows';
import { scrollToTop } from '../Helpers/UserAgent';

interface Props {
  params: {
    tabIndex: string;
  };
}
function Follows({ params }: Props): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Follows">
      <FollowsComponent tabIndex={params.tabIndex} />
    </div>
  );
}

export default Follows;
