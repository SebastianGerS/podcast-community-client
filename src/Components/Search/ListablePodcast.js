import React from 'react';
import PropTypes from 'prop-types';

const ListablePodcast = ({ data }) => (
  <div className="listable-podcast-searchresult">
    <figure>
      <img src={data.logo} alt="podcastlogo" />
    </figure>
  </div>
);

ListablePodcast.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListablePodcast;
