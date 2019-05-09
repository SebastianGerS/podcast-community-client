import React, { useEffect } from 'react';
import List from '../Common/List';
import EventComponent from './Event';
import { Event } from '../../Models/Event';
import Loader from '../Layout/Loader';

interface Props {
  events: Event[];
  nextOffset: number;
  morePages: boolean;
  getFollowingEvents: (offset: number) => void;
  isFetching: boolean;
}
const Feed = ({
  events, getFollowingEvents, nextOffset, morePages, isFetching,
}: Props): JSX.Element => {
  const onScroll = (): void => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)
      && Array.isArray(events) && morePages
    ) {
      window.removeEventListener('scroll', onScroll, false);

      getFollowingEvents(nextOffset);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);

    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  }, [events]);


  return (
    <div className="feed">
      { events.length > 0 && <List data={events} component={EventComponent} /> }
      { events.length === 0 && !isFetching
          && <div className="no-events"><p>{'There\'s no relevent events from the users you follow'}</p></div>
      }
      {isFetching && <Loader />}
    </div>
  );
};
export default Feed;
