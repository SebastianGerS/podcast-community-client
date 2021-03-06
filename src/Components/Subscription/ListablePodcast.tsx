import React from 'react';
import moment from 'moment';
import { Podcast } from '../../Models/Podcast';

interface Props {
  data: Podcast;
}

const ListablePodcast = ({ data }: Props): JSX.Element => (
  <div className="listable-podcast">
    <figure>
      <img src={typeof data.image === 'string' ? data.image : undefined} alt="podcastlogo" className="podcast-logo" />
      <figcaption>
        <span>
          {moment(typeof data.lastest_pub_date_ms === 'number' ? data.lastest_pub_date_ms : 0).format('DD/MM YYYY')}
        </span>
      </figcaption>
    </figure>
  </div>
);

export default ListablePodcast;
