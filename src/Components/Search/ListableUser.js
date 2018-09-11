import React from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';

const ListableUser = ({ data }) => (
  <div className="listable-user">
    <button type="button" />
    <div>
      <figure>
        <img src={data.profile_img.thumb} alt="podcastlogo" />
      </figure>
      <p>{data.username}</p>
    </div>
  </div>
);

ListableUser.propTypes = {
  data: PropTypes.objectOf(User).isRequired,
};

export default ListableUser;
