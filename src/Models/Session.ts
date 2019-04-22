import { Record } from 'immutable';
import { Episode } from './Episode';

export interface Session {
  _id: string | StringConstructor;
  user: string | StringConstructor;
  online: boolean | BooleanConstructor;
  listening_to: Episode | null;
  updated_at: string | StringConstructor;
}

export const Session = Record<Session>({
  _id: String,
  user: String,
  online: true,
  listening_to: new Episode(),
  updated_at: String,
});
