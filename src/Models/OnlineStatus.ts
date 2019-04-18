import { Record } from 'immutable';

export interface OnlineStatus {
  userId: string;
  online: boolean;
}

export const OnlineStatus = Record<OnlineStatus>({
  userId: '',
  online: false,
});
