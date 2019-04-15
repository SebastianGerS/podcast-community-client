import { RateEpisodeAction } from './RateEpisode';
import { SetRating } from './SetRating';
import { ResetRatings } from './ResetRatings';

export type RatingActions = RateEpisodeAction | SetRating | ResetRatings;

export * from './RateEpisode';
export * from './SetRating';
export * from './ResetRatings';
