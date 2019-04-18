import { UPDATE_ONLINE_STATUSES } from './types';
import { OnlineStatus } from '../../../Models/OnlineStatus';

export interface UpdateOnlineStatuses {
  type: UPDATE_ONLINE_STATUSES;
  status: OnlineStatus;
}

export const updateOnlineStatuses = (status: OnlineStatus): UpdateOnlineStatuses => ({
  type: UPDATE_ONLINE_STATUSES,
  status,
});
