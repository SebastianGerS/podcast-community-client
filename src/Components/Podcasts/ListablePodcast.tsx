import React from 'react';
import { Podcast } from '../../Models/Podcast';
import { getDatefromMilisecond } from '../../Helpers/Time';

interface Props {
  data: Podcast;
}

const ListablePodcast = ({ data }: Props): JSX.Element => (
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
);

export default ListablePodcast;
