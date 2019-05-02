import React from 'react';
import { Link } from 'react-router-dom';
import { Markup } from 'interweave';
import { Podcast } from '../../Models/Podcast';
import { getDatefromMilisecond } from '../../Helpers/Time';
import { setMaxLength } from '../../Helpers/Utils';

interface Props {
  data: Podcast;
}

const ListablePodcast = ({ data }: Props): JSX.Element => (
  <Link to={`/podcasts/${typeof data.id === 'string' ? data.id : ''}`}>
    <div className="listable-podcast">
      <figure>
        <img src={typeof data.image === 'string' ? data.image : ''} alt="podcastlogo" className="podcast-logo" />
        <figcaption>
          <Markup content={setMaxLength(typeof data.title === 'string' ? data.title : '', 65)} tagName="span" />
          <span>
            {getDatefromMilisecond(typeof data.lastest_pub_date_ms === 'number' ? data.lastest_pub_date_ms : 0)}
          </span>
        </figcaption>
      </figure>
    </div>
  </Link>
);

export default ListablePodcast;
