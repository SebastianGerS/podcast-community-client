import * as ActionsTypes from './types';

export interface SetEpisodeRating {
  type: ActionsTypes.SET_EPISODE_RATING;
  rating: number;
}

export const setEpisodeRating = (rating: number): SetEpisodeRating => ({
  type: ActionsTypes.SET_EPISODE_RATING,
  rating,
});
