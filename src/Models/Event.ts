import { Record } from 'immutable';

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
  target: {
    item: string | StringConstructor;
    kind: string | StringConstructor;
  };
  object: {
    item: string | StringConstructor;
    kind: string | StringConstructor;
  };
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
  target: {
    item: String,
    kind: String,
  },
  object: {
    item: String,
    kind: String,
  },
  type: String,
  date: String,
});
