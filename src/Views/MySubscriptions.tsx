import React, { useEffect } from 'react';
import UserSubscriptions from '../Containers/Subscription/MySubscriptions';
import { scrollToTop } from '../Helpers/UserAgent';

function MySubscriptions(): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="MySubscriptions">
      <UserSubscriptions />
    </div>
  );
}

export default MySubscriptions;
