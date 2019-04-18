import { SET_ONLINE_STATUSES } from './types';

export interface SetOnlineStatuses {
  type: SET_ONLINE_STATUSES;
  userIds: string[];
}

export const setOnlineStatuses = (userIds: string[]): SetOnlineStatuses => ({
  type: SET_ONLINE_STATUSES,
  userIds,
});
