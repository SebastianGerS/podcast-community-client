import React from 'react';
import { Link } from 'react-router-dom';
import { Markup } from 'interweave';
import moment from 'moment';
import { Podcast } from '../../Models/Podcast';
import SubscribeButton from '../../Containers/Common/SubscribeButton';
import RatingComponent from '../Common/Rating';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import { Rating } from '../../Models/Rating';
import { useSocket } from '../../Helpers/CustomHooks';
import { setMaxLength } from '../../Helpers/Utils';
import ImageLink from '../Common/ImageLink';

interface Props {
  data: Podcast;
  ratings: Rating[];
  socket: any;
  setRating: (rating: Rating) => void;
}

function ListablePodcast({
  data, ratings, socket, setRating,
}: Props): JSX.Element {
  const title = (
    typeof data.title === 'string'
      ? data.title
      : typeof data.title_original === 'string'
        ? data.title_original
        : ''
  );

  const publisher = (
    typeof data.publisher === 'string'
      ? data.publisher
      : typeof data.publisher_original === 'string'
        ? data.publisher_original
        : ''
  );

  const description = (
    typeof data.description === 'string'
      ? data.description
      : typeof data.description_original === 'string'
        ? data.description_original
        : ''
  );

  const podcastId = typeof data.id === 'string' ? data.id : '';

  const [newPodcastRating] = ratings.filter((rating: Rating) => rating.itemId === podcastId);

  const rating = newPodcastRating ? newPodcastRating.rating : data.avrageRating;

  useSocket(socket, `podcasts/${podcastId}/rating`, setRating);

  return (
    <div className="listable-podcast-searchresult">
      <Link to={`/podcasts/${podcastId}`}>
        <Markup content={setMaxLength(title, 35)} tagName="h3" />
      </Link>
      <div className="listable-podcast-img">
        <ImageLink
          imageSrc={typeof data.thumbnail === 'string' ? data.thumbnail : ''}
          imageAlt="podcastlogo"
          linkTo={`/podcasts/${podcastId}`}
        />
        <p>
          <span>{`By ${setMaxLength(publisher, 27)}`}</span>
          <span>
            {`Last updated ${
              moment(
                typeof data.lastest_pub_date_ms === 'number' ? data.lastest_pub_date_ms : 0,
              ).format('DD/MM YYYY')}
              `}
          </span>
        </p>
      </div>
      <div className="listable-podcast-description">
        <Markup content={setMaxLength(description, 100)} disableLineBreaks />
      </div>
      <div className="listable-podcast-controls">
        <RatingComponent rating={typeof rating === 'number' ? rating : 0} />
        <SubscribeButton podcast={data} />
        <MoreOptionsButton item={data} />
      </div>
    </div>
  );
}

export default ListablePodcast;
