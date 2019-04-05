import { Record } from 'immutable';
import { EventItem } from './EventItem';

export interface Event {
  _id: string | StringConstructor;
  agent: {
    item: {
      _id: string | StringConstructor;
      username?: string | StringConstructor;
      profile_img?: {
        thumb: string | StringConstructor;
      };
    };
    kind: string | StringConstructor;
  };
  target: EventItem;
  object: EventItem;
  type: string | StringConstructor;
  date: string | StringConstructor;
}

export const Event = Record<Event>({
  _id: String,
  agent: {
    item: {
      _id: String,
    },
    kind: String,
  },
  target: new EventItem(),
  object: new EventItem(),
  type: String,
  date: String,
});
