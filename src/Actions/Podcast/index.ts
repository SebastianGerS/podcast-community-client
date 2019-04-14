import { GetTopPodcastsAction } from './TopPodcasts';
import { GetPodcastAction } from './Podcast';
import { GetPodcastEpisodesAction } from './Episodes';
import { ResetPodcast } from './ResetPodcast';

export type PodcastActions = GetTopPodcastsAction | GetPodcastAction | GetPodcastEpisodesAction | ResetPodcast;

export * from './TopPodcasts';
export * from './Podcast';
export * from './Episodes';
export * from './ResetPodcast';
