import React, { useEffect } from 'react';
import UserSubscriptions from '../Containers/MySubscriptions';
import { scrollToTop } from '../Helpers/UserAgent';

function MySubscriptions() {
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
