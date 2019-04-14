import { RESET_PODCAST } from './types';

export interface ResetPodcast {
  type: RESET_PODCAST;
}

export const resetPodcast = (): ResetPodcast => ({
  type: RESET_PODCAST,
});
