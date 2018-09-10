import Immutable from 'immutable';

const User = Immutable.Record({
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

export default User;
