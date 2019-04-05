import { Record } from 'immutable';

export interface EventItem {
  item: string | StringConstructor;
  kind: string | StringConstructor;
  image?: string | StringConstructor;
  title?: string | StringConstructor;
  podcast_title?: string | StringConstructor;

}

export const EventItem = Record<EventItem>({
  item: String,
  kind: String,
});
