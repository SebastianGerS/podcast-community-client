import React from 'react';
import { Link } from 'react-router-dom';
import { Podcast } from '../../Models/Podcast';
import { getDatefromMilisecond } from '../../Helpers/Time';

interface Props {
  data: Podcast;
}

const ListablePodcast = ({ data }: Props): JSX.Element => (
  <Link to={`/podcasts/${typeof data.id === 'string' ? data.id : ''}`}>
    <div className="listable-podcast">
      <figure>
        <img src={typeof data.image === 'string' ? data.image : ''} alt="podcastlogo" className="podcast-logo" />
        <figcaption>
          {data.title}
          <span>
            {getDatefromMilisecond(typeof data.lastest_pub_date_ms === 'number' ? data.lastest_pub_date_ms : 0)}
          </span>
        </figcaption>
      </figure>
    </div>
  </Link>
);

export default ListablePodcast;
