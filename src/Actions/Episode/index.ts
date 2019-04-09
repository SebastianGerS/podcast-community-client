import { GetEpisodeAction } from './GetEpisode';
import { RateEpisodeAction } from './RateEpisode';
import { SetEpisodeRating } from './SetEpisodeRating';
import { GetEpisodeRatingAction } from './GetEpisodeRating';

export type EpisodeActions = GetEpisodeAction | RateEpisodeAction | SetEpisodeRating | GetEpisodeRatingAction;

export * from './GetEpisode';
export * from './RateEpisode';
export * from './SetEpisodeRating';
export * from './GetEpisodeRating';
