import { Record } from 'immutable';

export interface EventItem {
  item: string | StringConstructor;
  kind: string | StringConstructor;
}

export const EventItem = Record<EventItem>({
  item: String,
  kind: String,
});
