import { GetTopPodcastsAction } from './TopPodcasts';
import { GetPodcastAction } from './Podcast';
import { GetPodcastEpisodesAction } from './Episodes';

export type PodcastActions = GetTopPodcastsAction | GetPodcastAction | GetPodcastEpisodesAction;

export * from './TopPodcasts';
export * from './Podcast';
export * from './Episodes';
