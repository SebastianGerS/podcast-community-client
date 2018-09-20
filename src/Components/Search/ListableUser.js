import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from '../../Models/User';

const ListableUser = ({ data }) => (
  <div className="listable-user">
    <button aria-label="follow-button" type="button" />
    <div>
      <Link to={`/profile/${data._id}`}>
        <figure>
          <img src={data.profile_img.thumb} alt="podcastlogo" />
        </figure>
        <p>{data.username}</p>
      </Link>
    </div>
  </div>
);

ListableUser.propTypes = {
  data: PropTypes.objectOf(User).isRequired,
};

export default ListableUser;
