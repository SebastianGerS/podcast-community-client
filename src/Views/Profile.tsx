import React, { useEffect } from 'react';
import UserProfile from '../Containers/User/Profile';
import { scrollToTop } from '../Helpers/UserAgent';

interface Props {
  params: {
    userId: string;
  };
}

function Profile({ params }: Props): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Profile">
      <UserProfile userId={params.userId} />
    </div>
  );
}

export default Profile;
