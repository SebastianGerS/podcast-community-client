import React from 'react';
import PropTypes from 'prop-types';
import Podcast from '../../Models/Podcast';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';

const ListablePodcast = ({ data }) => (
  <div className="listable-podcast-searchresult">
    <h3>{data.title_original.length > 35 ? `${data.title_original.substring(0, 31)}...` : data.title_original}</h3>
    <div>
      <figure>
        <img src={data.thumbnail} alt="podcastlogo" />
      </figure>
      <p>
        <span>{`By ${data.publisher_original.length > 27 ? `${data.publisher_original.substring(0, 23)}...` : data.publisher_original}`}</span>
        <span>{ `Last updated ${getDatefromMilisecond(data.lastest_pub_date_ms)}`}</span>
      </p>
    </div>
    <div>
      <p>
        {data.description_original.length > 150 ? `${data.description_original.substring(0, 147)}...` : data.description_original}
      </p>
    </div>
    <div>
      <figure className="rating">
        <img src={Star} alt="podcastLogo" />
        <figcaption>5.0</figcaption>
      </figure>
      <button type="button" className="subscribe-button">Subscribe</button>
      <button type="button" aria-label="more-options-button" className="more-options-button" />
    </div>
  </div>
);
ListablePodcast.propTypes = {
  data: PropTypes.objectOf(Podcast).isRequired,
};

export default ListablePodcast;
