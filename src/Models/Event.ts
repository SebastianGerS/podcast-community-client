import { Record } from 'immutable';
import { EventItem } from './EventItem';

export interface Event {
  _id: string | StringConstructor;
  agent: EventItem;
  target: EventItem;
  object: EventItem;
  type: string | StringConstructor;
  date: string | StringConstructor;
}

export const Event = Record<Event>({
  _id: String,
  agent: new EventItem(),
  target: new EventItem(),
  object: new EventItem(),
  type: String,
  date: String,
});
