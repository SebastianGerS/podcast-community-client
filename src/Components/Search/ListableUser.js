import React from 'react';
import PropTypes from 'prop-types';

const ListableUser = ({ data }) => (
  <div className="listable-user">
    <figure>
      <img src={data.profileImg} alt="podcastlogo" />
    </figure>
  </div>
);

ListableUser.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListableUser;
