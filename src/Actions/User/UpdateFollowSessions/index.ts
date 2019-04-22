import { UPDATE_FOLLOW_SESSIONS } from './types';
import { Session } from '../../../Models/Session';

export interface UpdateFollowSessions {
  type: UPDATE_FOLLOW_SESSIONS;
  session: Session;
}

export const updateFollowSessions = (session: Session): UpdateFollowSessions => ({
  type: UPDATE_FOLLOW_SESSIONS,
  session,
});
