import Immutable from 'immutable';

const Message = Immutable.Record({
  type: String,
  text: String,
});

export default Message;
