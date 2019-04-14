import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatefromMilisecond } from '../../Helpers/Time';
import { Podcast } from '../../Models/Podcast';
import SubscribeButton from '../../Containers/Common/SubscribeButton';
import RatingComponent from '../Common/Rating';
import MoreOptionsButton from '../../Containers/Common/MoreOptions/MoreOptionsButton';
import { Rating } from '../../Models/Rating';

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

  useEffect(() => {
    let removeListener;
    if (socket && !socket.hasListeners(`podcasts/${podcastId}/rating`)) {
      socket.on(`podcasts/${podcastId}/rating`, setRating);

      removeListener = () => {
        socket.removeListener(`podcasts/${podcastId}/rating`, setRating);
      };
    }
    return removeListener;
  }, [socket]);

  return (
    <div className="listable-podcast-searchresult">
      <Link to={`/podcasts/${typeof data.id === 'string' ? data.id : ''}`}>
        <h3>{title.length > 35 ? `${title.substring(0, 31)}...` : title}</h3>
        <div>
          <figure>
            <img src={typeof data.thumbnail === 'string' ? data.thumbnail : ''} alt="podcastlogo" />
          </figure>
          <p>
            <span>{`By ${publisher.length > 27 ? `${publisher.substring(0, 23)}...` : publisher}`}</span>
            <span>
              {`Last updated ${
                getDatefromMilisecond(
                  typeof data.lastest_pub_date_ms === 'number' ? data.lastest_pub_date_ms : 0,
                )}
              `}
            </span>
          </p>
        </div>
      </Link>
      <div>
        <p>
          {description.length > 150 ? `${description.substring(0, 147)}...` : description}
        </p>
      </div>
      <div>
        <RatingComponent rating={typeof rating === 'number' ? rating : 0} />
        <SubscribeButton podcast={data} />
        <MoreOptionsButton item={data} />
      </div>
    </div>
  );
}

export default ListablePodcast;
