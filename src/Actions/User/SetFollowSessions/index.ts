import { SET_FOLLOW_SESSIONS } from './types';
import { Session } from '../../../Models/Session';

export interface SetFollowSessions {
  type: SET_FOLLOW_SESSIONS;
  sessions: Session[];
}

export const setFollowSessions = (sessions: Session[]): SetFollowSessions => ({
  type: SET_FOLLOW_SESSIONS,
  sessions,
});
