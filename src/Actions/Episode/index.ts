import { GetEpisodeAction } from './GetEpisode';
import { RateEpisodeAction } from './RateEpisode';
import { SetEpisodeRating } from './SetEpisodeRating';

export type EpisodeActions = GetEpisodeAction | RateEpisodeAction | SetEpisodeRating;

export * from './GetEpisode';
export * from './RateEpisode';
export * from './SetEpisodeRating';
