import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from '../Containers/Profile';

const Profile = ({ params }) => (
  <div className="Profile">
    <UserProfile userId={params.userId} />
  </div>
);

Profile.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Profile;
