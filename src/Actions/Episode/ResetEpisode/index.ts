import { RESET_EPISODE } from './types';

export interface ResetEpisode {
  type: RESET_EPISODE;
}

export const resetEpisode = (): ResetEpisode => ({
  type: RESET_EPISODE,
});
