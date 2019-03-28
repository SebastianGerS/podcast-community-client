import Immutable from 'immutable';

export interface User {
  _id: string | StringConstructor;
  username: string | StringConstructor;
  email: string | StringConstructor;
  age: number | NumberConstructor;
  bio: string | StringConstructor;
  type: string | StringConstructor;
  profile_img: {
    thumb: string | StringConstructor;
    standard: string | StringConstructor;
    large: string | StringConstructor;
  };
  following: string[] | ArrayConstructor;
  followers: string[] | ArrayConstructor;
  requests: string[] | ArrayConstructor;
  listenlist: string[] | ArrayConstructor;
  subscriptions: string[] | ArrayConstructor;
  notifications: string[] | ArrayConstructor;
  events: string[] | ArrayConstructor;
  restricted: string[] | ArrayConstructor;
}

export const User = Immutable.Record<User>({
  _id: String,
  username: String,
  email: String,
  age: Number,
  bio: String,
  type: String,
  profile_img: {
    thumb: String,
    standard: String,
    large: String,
  },
  following: Array,
  followers: Array,
  requests: Array,
  listenlist: Array,
  subscriptions: Array,
  notifications: Array,
  events: Array,
  restricted: Array,
});
