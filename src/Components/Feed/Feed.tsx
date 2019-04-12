import React, { useEffect } from 'react';
import List from '../Common/List';
import EventComponent from './Event';
import { Event } from '../../Models/Event';

interface Props {
  events: Event[];
  socket: any;
  userId: string;
  nextOffset: number;
  morePages: boolean;
  getFollowingEvents: (offset: number) => void;
  setEvent: (event: Event) => void;
}
const Feed = ({
  events, getFollowingEvents, socket, userId, setEvent, nextOffset, morePages,
}: Props): JSX.Element => {
  useEffect(() => {
    if (events.length === 0) {
      getFollowingEvents(nextOffset);
    }
  }, []);

  useEffect(() => {
    let removeListener;

    if (socket && !socket.hasListeners(`users/${userId}/event`)) {
      socket.on(`users/${userId}/event`, setEvent);
      removeListener = () => {
        socket.removeListener(`users/${userId}/event`, setEvent);
      };
    }

    return removeListener;
  }, [socket]);

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
      {
        events.length > 0
          ? <List data={events} component={EventComponent} />
          : <div className="no-events"><p>{'There\'s no relavent events from the users you follow'}</p></div>
      }

    </div>
  );
};
export default Feed;
