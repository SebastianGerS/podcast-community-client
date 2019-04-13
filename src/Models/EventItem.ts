import { Record } from 'immutable';

export interface EventItem {
  _id: string | StringConstructor;
  kind: string | StringConstructor;
  image: string | StringConstructor;
  name: string | StringConstructor;
  parent_name?: string;
  rating?: number;
}

export const EventItem = Record<EventItem>({
  _id: String,
  kind: String,
  image: String,
  name: String,
});
