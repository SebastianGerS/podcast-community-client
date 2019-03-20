import Immutable from 'immutable';

export interface Message {
  type: string | StringConstructor;
  text: string | StringConstructor;
}

export const Message = Immutable.Record<Message>({
  type: String,
  text: String,
});
