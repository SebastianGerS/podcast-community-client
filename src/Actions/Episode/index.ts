import { GetEpisodeAction } from './GetEpisode';
import { ResetEpisode } from './ResetEpisode';

export type EpisodeActions = GetEpisodeAction | ResetEpisode;

export * from './GetEpisode';
export * from './ResetEpisode';
