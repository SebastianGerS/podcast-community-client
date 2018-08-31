import React from 'react';
import PropTypes from 'prop-types';

const ListablePodcast = ({ data }) => (
  <div className="listable-podcast">
    <figure>
      <img src={data.logo} alt="podcastlogo" />
      <figcaption>
        {data.podcast}
        <span>{data.lastestEpisodeDate}</span>
      </figcaption>
    </figure>
  </div>
);

ListablePodcast.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListablePodcast;
