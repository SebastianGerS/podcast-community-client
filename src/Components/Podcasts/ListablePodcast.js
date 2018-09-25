import React from 'react';
import PropTypes from 'prop-types';
import Podcast from '../../Models/Podcast';
import { getDatefromMilisecond } from '../../Helpers/Time';

const ListablePodcast = ({ data }) => (
  <div className="listable-podcast">
    <figure>
      <img src={data.image} alt="podcastlogo" className="podcast-logo" />
      <figcaption>
        {data.title}
        <span>{getDatefromMilisecond(data.lastest_pub_date_ms)}</span>
      </figcaption>
    </figure>
  </div>
);

ListablePodcast.propTypes = {
  data: PropTypes.shape(Podcast).isRequired,
};

export default ListablePodcast;
