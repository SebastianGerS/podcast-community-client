import React from 'react';
import uuid from 'uuid';
import List from '../Common/List';
import EventComponent from './Event';
import { Event } from '../../Models/Event';
import { EventItem } from '../../Models/EventItem';


const Feed = (): JSX.Element => {
  const data: Event[] = [
    new Event({
      _id: uuid.v4(),
      agent: {
        _id: '77c76cb9-0b57-4a78-83b5-463274fa5380',
        kind: 'User',
        name: 'public',
        image: 'http://localhost:1337/default_profile_img.svg',
      },
      target: {
        _id: 'a4c57620961b4bd1a1a99c88ab0d770e',
        kind: 'Podcast',
        name: 'The Breakdown with Shaun King',
        image: 'https://d3sv2eduhewoas.cloudfront.net/channel/image/c0c54e6956d04cbaac4a9188b877dbcd.jpg',
      },
      object: new EventItem(),
      type: 'subscribe',
      date: '2019-04-13',
    }),
    new Event({
      _id: uuid.v4(),
      agent: {
        _id: '4cc348d0-77b0-450e-8bb6-ba0f3efbc7d1',
        kind: 'User',
        name: 'private',
        image: 'http://localhost:1337/default_profile_img.svg',
      },
      target: {
        _id: '77c76cb9-0b57-4a78-83b5-463274fa5380',
        kind: 'User',
        name: 'public',
        image: 'http://localhost:1337/default_profile_img.svg',
      },
      object: new EventItem(),
      type: 'follow',
      date: '2019-04-13',
    }),
    new Event({
      _id: uuid.v4(),
      agent: {
        _id: '4cc348d0-77b0-450e-8bb6-ba0f3efbc7d1',
        kind: 'User',
        name: 'private',
        image: 'http://localhost:1337/default_profile_img.svg',
      },
      target: {
        _id: '77c76cb9-0b57-4a78-83b5-463274fa5380',
        kind: 'User',
        name: 'public',
        image: 'http://localhost:1337/default_profile_img.svg',
      },
      object: new EventItem(),
      type: 'confirm',
      date: '2019-04-13',
    }),
    new Event({
      _id: uuid.v4(),
      agent: {
        _id: '77c76cb9-0b57-4a78-83b5-463274fa5380',
        kind: 'User',
        name: 'public',
        image: 'http://localhost:1337/default_profile_img.svg',
      },
      target: {
        _id: '4cc348d0-77b0-450e-8bb6-ba0f3efbc7d1',
        kind: 'User',
        name: 'private',
        image: 'http://localhost:1337/default_profile_img.svg',
      },
      object: {
        _id: 'a4c57620961b4bd1a1a99c88ab0d770e',
        kind: 'Podcast',
        name: 'The Breakdown with Shaun King',
        image: 'https://d3sv2eduhewoas.cloudfront.net/channel/image/c0c54e6956d04cbaac4a9188b877dbcd.jpg',
      },
      type: 'recommend',
      date: '2019-04-13',
    }),
  ];

  return (
    <div>
      <h3>Feed</h3>
      <List data={data} component={EventComponent} />
    </div>
  );
};

export default Feed;
