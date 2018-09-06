import React from 'react';
import PropTypes from 'prop-types';

const ListableEpisode = ({ data }) => (
  <div className="listable-episode">
    <figure>
      <img src={data.logo} alt="podcastlogo" />
    </figure>
  </div>
);

ListableEpisode.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListableEpisode;
