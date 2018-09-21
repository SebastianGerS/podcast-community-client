import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserProfile from '../Containers/Profile';
import { scrollToTop } from '../Helpers/UserAgent';

class Profile extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    const { params } = this.props;
    return (
      <div className="Profile">
        <UserProfile userId={params.userId} />
      </div>
    );
  }
}
Profile.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Profile;
