import { RESET_RATINGS } from './types';

export interface ResetRatings {
  type: RESET_RATINGS;
}

export const resetRatings = (): ResetRatings => ({
  type: RESET_RATINGS,
});
