import React from 'react';
import List from '../Common/List';
import EventComponent from './Event';
import { Event } from '../../Models/Event';

interface Props {
  events: Event[];
}
const Feed = ({ events }: Props): JSX.Element => (
  <div className="feed">
    {
      events.length > 0
        ? <List data={events} component={EventComponent} />
        : <div className="no-events"><p>{'There\'s no relavent events from the users you follow'}</p></div>
    }

  </div>
);

export default Feed;
