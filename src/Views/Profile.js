import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserProfile from '../Containers/Profile';
import { scrollToTop } from '../Helpers/UserAgent';

function Profile({ params }) {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Profile">
      <UserProfile userId={params.userId} />
    </div>
  );
}

Profile.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Profile;
