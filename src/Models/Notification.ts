import { Record } from 'immutable';
import { Event } from './Event';

export interface Notification {
  _id: string | StringConstructor;
  event: Event;
  user: string | StringConstructor;
  observed: boolean | BooleanConstructor;
}

export const Notification = Record<Notification>({
  _id: String,
  event: new Event(),
  user: String,
  observed: Boolean,
});
