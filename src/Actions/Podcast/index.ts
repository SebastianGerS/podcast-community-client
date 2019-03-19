import { GetTopPodcastsAction } from './TopPodcasts';
import { GetPodcastAction } from './Podcast';

export type PodcastActions = GetTopPodcastsAction | GetPodcastAction;

export * from './TopPodcasts';
export * from './Podcast';
